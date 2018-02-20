require('whatwg-fetch')

fetch('https://vd2wzffzz8.execute-api.eu-central-1.amazonaws.com/latest')
  .then(response => response.json())
  .then(res => {
    let schedule = []
    res.forEach(el => {
      if (!schedule[el.day]) {
        schedule[el.day] = []
        schedule[el.day][el.start] = el
      } else {
        schedule[el.day].push(el)
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
            day.innerHTML += '<td><br></td>'
            i++
          } else {
            let lecture = `<td colspan="${
              schedule[index + 1][i + 1].duration
            }" style="text-align:center;">
            ${schedule[index + 1][i + 1].course}<br>
            ${schedule[index + 1][i + 1].classroom}<br>
            ${schedule[index + 1][i + 1].professor}
            </td>`
            day.innerHTML += lecture
            i += schedule[index + 1][i + 1].duration
          }
        }
      }
    })
  })
