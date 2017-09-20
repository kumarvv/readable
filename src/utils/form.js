export default function fillForm(data) {
  data && Object.keys(data).forEach(key => {
    let elm = document.getElementsByName(key)[0]
    elm && (
      elm.value = data[key]
    )
  })
}
