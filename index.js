require('whatwg-fetch')
const idb = require('idb')
const isEqual = require('lodash.isequal')

const dbPromise = idb.open('yas-store', 1, upgradeDB => {
  upgradeDB.createObjectStore('keyval')
})

const idbKeyVal = {
  get (key) {
    return dbPromise.then(db => {
      return db
        .transaction('keyval')
        .objectStore('keyval')
        .get(key)
    })
  },
  set (key, val) {
    return dbPromise.then(db => {
      const tx = db.transaction('keyval', 'readwrite')
      tx.objectStore('keyval').put(val, key)
      return tx.complete
    })
  }
}

const clearSchedule = () => {
  let days = document.querySelectorAll('.days')

  days.forEach((day, index) => {
    while (day.childNodes.length > 3) {
      day.removeChild(day.lastChild)
    }
  })
}

const makeSchedule = res => {
  clearSchedule()
  let schedule = []

  console.log(res)

  res.forEach(el => {
    if (!schedule[el.day]) {
      schedule[el.day] = []
      schedule[el.day][el.start] = el
    } else {
      schedule[el.day][el.start] = el
    }
  })

  let days = document.querySelectorAll('.days')

  days.forEach((day, index) => {
    if (!schedule[index + 1]) {
      for (let i = 0; i < 13; i++) {
        day.innerHTML += '<td><br></td>'
      }
    } else {
      let i = 0

      while (i < 13) {
        if (!schedule[index + 1][i + 1]) {
          day.innerHTML += '<td class="border border-info"><br></td>'
          i++
        } else {
          let lecture = `<td colspan="${
            schedule[index + 1][i + 1].duration
          }" class="text-center border border-info">
          <small class="text-center">${
  schedule[index + 1][i + 1].course
}</small><br>
            ${
  schedule[index + 1][i + 1].group !== 'x'
    ? '<small class="text-center">' +
                  schedule[index + 1][i + 1].group +
                  '</small><br>'
    : ''
}
            <small class="text-center">${
  schedule[index + 1][i + 1].professor
}</small><br>
            <small class="text-center">${
  schedule[index + 1][i + 1].classroom
}</small>
            </td>`
          day.innerHTML += lecture
          i += schedule[index + 1][i + 1].duration
        }
      }
    }
  })
}

const initialSchedule = async function () {
  let schedule = await idbKeyVal.get('schedule')
  if (!schedule) return

  makeSchedule(schedule)
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(() => {
    console.log('Service worker is registered!')
  })
}

initialSchedule()

fetch('https://vd2wzffzz8.execute-api.eu-central-1.amazonaws.com/latest')
  .then(response => response.json())
  .then(async res => {
    res = JSON.parse(res.body)
    let schedule = await idbKeyVal.get('schedule')

    if (!isEqual(res, schedule)) {
      makeSchedule(res)
      idbKeyVal.set('schedule', res)
    }
  })
