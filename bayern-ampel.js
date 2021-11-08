/* Corona Ampel Bayern Widget
**
** Copyright (C) 2021 by oschn0r (ingo@stonith.org)
**
** Datasource: https://www.i-novation.de/corona-ampel-bayern/#api
**
*/


let widget      = new ListWidget()
let padding     = 22
widget.url      = "https://corona-ampel-bayern.de/data/data.json"

widget.setPadding(padding, padding, padding, padding)

// load data from i-novation
let data        = await loadItems()

// Widget title
let title   = widget.addText("🚦Covid-19 Bayern".toUpperCase())
title.font  = Font.mediumSystemFont(10)

widget.addSpacer(16)

// create three panes with traffic light data
let redStack = widget.addStack()
redStack.layoutHorizontally()
addStackToView(redStack, {shortDescription: 'ITS', stringValue: data.currentIntensiveCarePatients.toString()})

Script.setWidget(widget)
Script.complete()

widget.presentSmall()

function addStackToView(widget, data) {
    let viewStack = widget.addStack()
    viewStack.layoutVertically()

    let label           = viewStack.AddText(data.shortDescription)
    label.font          = Font.mediumSystemFont(12)

    let value           = viewStack.addText(data.stringValue)
    value.font          = Font.mediumSystemFont(20)
    value.textColor     = Color.white()
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