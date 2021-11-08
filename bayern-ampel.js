/* Corona Ampel Bayern Widget
**
** Copyright (C) 2021 by oschn0r (ingo@stonith.org)
**
** Datasource: https://www.i-novation.de/corona-ampel-bayern/#api
**
*/


let widget      = new ListWidget()
widget.url      = "https://corona-ampel-bayern.de/"

widget.setPadding(10, 10, 10, 10)

// load data from i-novation
let data        = await loadItems()

// Widget title
let title   = widget.addText("🚦 Covid Bayern".toUpperCase())
title.font  = Font.mediumSystemFont(10)

let latest  = widget.addDate(new Date(data.lastUpdate))
latest.font = Font.mediumSystemFont(6)

widget.addSpacer(0)

/*
let trafficLightStack = widget.addStack()
trafficLightStack.layoutVertically()
addStackToView(trafficLightStack, {shortDescription: '🚦', footnote: null, stringValue: null})
*/

// no data for all panes
let stackITS = widget.addStack()
stackITS.layoutHorizontally()
addStackToView(stackITS, {shortDescription: 'ITS Belegung', footnote: '(Betten)', stringValue: data.currentIntensiveCarePatients.toString()}, Color.red())
widget.addSpacer(0)

let stackAdmissions = widget.addStack()
stackAdmissions.layoutHorizontally()
addStackToView(stackAdmissions, {shortDescription: 'Einweisungen', footnote: '(7 Tage)', stringValue: data.hospitalizationLast7Days.toString()}, Color.yellow())
widget.addSpacer(0)

let stackIncidence = widget.addStack()
stackIncidence.layoutHorizontally()
addStackToView(stackIncidence, {shortDescription: 'Inzidenz', footnote: '(7 Tage)', stringValue: data.hospitalizationLast7DaysIncidence.toString()}, Color.green())
widget.addSpacer(0)

    //if (data.currentIntensiveCarePatients >= 600) {}
// } else if (data.currentIntensiveCarePatients >= 450 || data.hospitalizationLast7Days >= 1200) {

Script.setWidget(widget)
Script.complete()

widget.presentSmall()

function addStackToView(widget, data, color) {
    let viewStack = widget.addStack()
    viewStack.layoutVertically()

    let label           = viewStack.addText(data.shortDescription)
    label.font          = Font.mediumSystemFont(10)

    let footnote        = viewStack.addText(data.footnote)
    footnote.font       = Font.mediumSystemFont(6)

    let value           = viewStack.addText(data.stringValue)
    value.font          = Font.mediumSystemFont(16)
    value.textColor     = color
}

async function loadItems() {
    /*
    {
        "hospitalizationLast7Days":             740,
        "hospitalizationLast7DaysIncidence":    5.6,
        "currentIntensiveCarePatients":         609,
        "lastSync":                             "2021-11-08T08:20:41.786Z",
        "lastUpdate":                           "2021-11-08T08:13:51.468Z"
    }
    */
    let url     = "https://corona-ampel-bayern.de/data/data.json"
    let req     = new Request(url)
    let json    = await req.loadJSON()

    return json
}