const adjust = document.querySelector('#album')

if (adjust){
    fetch('/images')
    .then(res => res.json())
    .then(res => {
        res.forEach(image =>{
            const img = document.createElement('img')
            img.src = `/upload/${image}`

            adjust.appendChild(img)
        })
    })
}
