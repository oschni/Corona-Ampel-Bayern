// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: briefcase-medical;

// Corona Ampel Bayern Widget
//
// Copyright (C) 2021 by oschn0r (ingo@stonith.org)
//
// Datasource: https://www.i-novation.de/corona-ampel-bayern/#api
//
//

let widget      = new ListWidget()
widget.url      = 'https://corona-ampel-bayern.de/'

widget.setPadding(10, 10, 10, 10)

// load data from i-novation
let data        = await loadItems()

// Widget title
let title   = widget.addText('Covid Ampel BY'.toUpperCase())
title.font  = Font.mediumSystemFont(10)

let dF = new DateFormatter()
dF.dateFormat = 'dd.MM.YYYY HH:mm'

let lastUpdate  = widget.addText(dF.string(new Date(data.lastUpdate)))
lastUpdate.font = Font.mediumSystemFont(10)
lastUpdate.textColor = Color.darkGray()

widget.addSpacer(5)

let mainStack = widget.addStack()
mainStack.layoutVertically()
mainStack.backgroundColor = Color.lightGray()
mainStack.centerAlignContent()

if (data.officialState === 'red') {
    let redStack = mainStack.addStack()
    redStack.layoutHorizontally()
    redStack.addSpacer()

    let stackITS = redStack.addStack()
    stackITS.layoutVertically()
    
    let stringValueITS = stackITS.addText(data.currentIntensiveCarePatients.toString())
    stringValueITS.font = Font.mediumSystemFont(20)
    stringValueITS.textColor = Color.red()
    stringValueITS.centerAlignText()

    redStack.addSpacer()

    let labelITS = stackITS.addText('ITS Belegung')
    labelITS.font = Font.mediumSystemFont(6)

    redStack.addSpacer()

    let stackPatients = redStack.addStack()
    stackPatients.layoutVertically()

    let stringValue2 = stackPatients.addText(data.hospitalizationLast7Days.toString())
    stringValue2.font = Font.mediumSystemFont(20)
    stringValue2.textColor = Color.red()
    
    redStack.addSpacer(0)
    
    let labelHospitalization = stackPatients.addText('Einweisungen')
    labelHospitalization.font = Font.mediumSystemFont(6)

    widget.addSpacer(20)
    
    emojiiStack = widget.addStack()
    emojiiStack.layoutHorizontally()
    
    let labelEmoji = emojiiStack.addText(' @#§"$! 🤬 ')
    labelEmoji.textColor = Color.red()
    labelEmoji.font = Font.mediumSystemFont(20)

} else if (data.officialState === 'yellow') {
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

    yellowStack.addSpacer(40)

    let stackPatients = yellowStack.addStack()
    stackPatients.layoutVertically()
    let stringValue2 = stackPatients.addText(data.hospitalizationLast7Days.toString())
    stringValue2.font = Font.mediumSystemFont(20)
    stringValue2.textColor = Color.yellow()
    yellowStack.addSpacer(0)
    let labelHospitalization = stackPatients.addText('Einweisungen')
    labelHospitalization.font = Font.mediumSystemFont(6)

    widget.addSpacer(20)
    emojiiStack = widget.addStack()
    emojiiStack.layoutHorizontally()
    
    let labelEmoji = emojiiStack.addText(' Buääärks 🤮 ')
    labelEmoji.textColor = Color.yellow()
    labelEmoji.font = Font.mediumSystemFont(20)

} else if(data.officialState === 'green') {
    let greenStack = widget.addStack()
    greenStack.layoutHorizontally()

    let stackITS = greenStack.addStack()
    stackITS.layoutVertically()
    let stringValueITS = stackITS.addText(data.currentIntensiveCarePatients.toString())
    stringValueITS.font = Font.mediumSystemFont(20)
    stringValueITS.textColor = Color.green()
    greenStack.addSpacer(0)
    let labelITS = stackITS.addText('ITS Belegung')
    labelITS.font = Font.mediumSystemFont(6)

    greenStack.addSpacer(40)

    let stackPatients = greenStack.addStack()
    stackPatients.layoutVertically()
    let stringValue2 = stackPatients.addText(data.hospitalizationLast7Days.toString())
    stringValue2.font = Font.mediumSystemFont(20)
    stringValue2.textColor = Color.green()
    greenStack.addSpacer(0)
    let labelHospitalization = stackPatients.addText('Einweisungen')
    labelHospitalization.font = Font.mediumSystemFont(6)

    widget.addSpacer(20)
    let allFineStack = widget.addStack()
    allFineStack.layoutHorizontally()

    let labelAllFine = allFineStack.addText(' Alles Tutti! 🥰 ')
    labelAllFine.font = Font.mediumSystemFont(20)
    labelAllFine.textColor = Color.green()
}

Script.setWidget(widget)
Script.complete()

widget.presentSmall()
//widget.presentMedium()

async function loadItems() {
    // json.nextswitch could be null
    /*let json = {
    "hospitalizationLast7Days": 709,
    "hospitalizationLast7DaysIncidence": 5.4,
    "currentIntensiveCarePatients": 608,
    "lastSync": "2021-11-08T13:15:02.598Z",
    "lastUpdate": "2021-11-08T13:15:06.496Z",
    "state": "red",
    "officialState": "yellow",
    "nextSwitch": {
        "date": "2021-11-08T23:00:00.000Z",
        "state": "red"
    },
    "yellowPercent": 135.1,
    "redPercent": 101.3
}*/
    
    let url     = 'https://corona-ampel-bayern.de/data/data.json'
    let req     = new Request(url)
    let json    = await req.loadJSON()
    return json
}