const inputFile = document.querySelector('input[type="file"]')
inputFile.onchange = function () {
    console.log("inputFile.onchange")
    const reader = new FileReader()
    reader.onload = function () {
        const buffer = this.result
        const mp3tag = new MP3Tag(buffer)
        mp3tag.read()
        console.log(mp3tag.tags)
    }

    if (this.files.length > 0) {
        reader.readAsArrayBuffer(this.files[0])
    }
}