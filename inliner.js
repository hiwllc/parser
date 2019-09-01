const fs = require('fs')
const htmlDocx = require('html-docx-js')
const cheerio = require('cheerio')
const styles = require('./styles')

module.exports = (filename, content) => {
  const $ = cheerio.load(content)

  $('h2, h3, h4, h5, p').map((i, e) => {
    const classname = e.attribs.class
    const mathStyle = styles.find(s => s.classname === classname)

    if (mathStyle) {
      $(`${e.tagName}.${classname}`)
        .attr('style', mathStyle.style)
        .removeAttr('class')
    }
  })

  const converted = htmlDocx.asBlob($.html(), {
    margins: {
      right: '2cm',
      left: '1.5cm',
    }
  })

  return converted

  // fs.writeFileSync(`${fileName}.doc`, Uint8Array.from(Buffer.from(converted)))
}
