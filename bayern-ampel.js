/* Corona Ampel Bayern Widget
**
** Copyright (C) 2021 by oschn0r (ingo@stonith.org)
**
** Datasource: https://www.i-novation.de/corona-ampel-bayern/#api
**
*/

let updateHash = 'c578e329a89c8fd2f65cdeae178f3519'

let widget      = new ListWidget()
widget.url      = 'https://corona-ampel-bayern.de/'

widget.setPadding(10, 10, 10, 10)

// load data from i-novation
let data        = await loadItems()

// Widget title
let title   = widget.addText('Covid Bayern'.toUpperCase())
title.font  = Font.mediumSystemFont(10)

let latest  = widget.addDate(new Date(data.lastUpdate))
latest.font = Font.mediumSystemFont(6)

widget.addSpacer(5)

let mainStack = widget.addStack()
mainStack.layoutHorizontally()

if (data.currentIntensiveCarePatients >= 600) {
    let redStack = widget.addStack()
    redStack.layoutHorizontally()
    redStack.centerAlignContent()

    let stringValue = widget.addText(data.currentIntensiveCarePatients.toString())
    stringValue.font = Font.mediumSystemFont(20)
    stringValue.textColor = Color.red()

    redStack.addSpacer(0)
    let label = widget.addText('ITS Belegung')
    label.font = Font.mediumSystemFont(6)

} else if (data.currentIntensiveCarePatients >= 450 && data.currentIntensiveCarePatients <= 599 ||  data.hospitalizationLast7Days >= 1200) {
    let yellowStack = widget.addStack()
    yellowStack.layoutHorizontally()

    let stackITS = yellowStack.addStack()
    stackITS.layoutVertically()
    let stringValueITS = stackITS.addText(data.currentIntensiveCarePatients.toString())
    stringValueITS.font = Font.mediumSystemFont(20)
    stringValueITS.textColor = Color.yellow()
    yellowStack.addSpacer(0)
    let labelITS = stackITS.addText('ITS Belegung')
    labelITS.font = Font.mediumSystemFont(6)

    yellowStack.addSpacer(0)

    let stackPatients = yellowStack.addStack()
    stackPatients.layoutVertically()
    let stringValue2 = stackPatients.addText(data.hospitalizationLast7Days.toString())
    stringValue2.font = Font.mediumSystemFont(20)
    stringValue2.textColor = Color.yellow()
    yellowStack.addSpacer(0)
    let labelHospitalization = stackPatients.addText('Einweisungen')
    labelHospitalization.font = Font.mediumSystemFont(6)
}

Script.setWidget(widget)
Script.complete()

//widget.presentSmall()
widget.presentMedium()

async function loadItems() {
    let fooData = {
        "hospitalizationLast7Days":             740,
        "hospitalizationLast7DaysIncidence":    5.6,
        "currentIntensiveCarePatients":         599,
        "lastSync":                             "2021-11-08T08:20:41.786Z",
        "lastUpdate":                           "2021-11-08T08:13:51.468Z"
    }
    
    let url     = 'https://corona-ampel-bayern.de/data/data.json'
    let req     = new Request(url)
    //let json    = await req.loadJSON()
    //return json
    return fooData
}