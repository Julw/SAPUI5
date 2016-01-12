/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("hcm.mytimesheet.model.TimeEntry");
hcm.mytimesheet.model.TimeEntry = function(t, c, s, e) {
	this.time = t;
	this.hours = Math.floor(t);
	this.minutes = Math.round((t - Math.floor(t)) * 60);
	this.suggestion = s === undefined ? false : s;
	this.newEntry = !e;
	this.mainItem = null;
	this.subItems = c;
	this.notes = null;
	this.startTime = "";
	this.endTime = "";
	this.counter = "";
	this.hasNotes = false;
	this.showTime = e;
	this.showError = false;
	this.error = "";
	this.status = "";
	this.statusId = ""
};
hcm.mytimesheet.model.TimeEntry.prototype.setStartEndTimes = function(d, e, m, w) {
	var l = e.length - 1;
	while (l >= 0 && e[e.length - 1].deleted) {
		l--
	}
	var s = this.createTime(d, l >= 0 ? e[l].endTime : w.startTime);
	var a = this.createTime(d, w ? w.lunchStart : "000000");
	var b = this.createTime(d, w ? w.lunchEnd : "000000");
	if (s.getTime() === a.getTime()) {
		s.setTime(s.getTime() + b.getTime() - a.getTime())
	}
	var c = new Date(s.getTime() + m * 3600000);
	if (s.getTime() < a.getTime()) {
		c.setTime(c.getTime() + b.getTime() - a.getTime())
	}
	this.startTime = (s.getHours() + 100).toString().substring(1, 3) + (s.getMinutes() + 100).toString().substring(1, 3) + "00";
	this.endTime = (c.getHours() + 100).toString().substring(1, 3) + (c.getMinutes() + 100).toString().substring(1, 3) + "00"
};
hcm.mytimesheet.model.TimeEntry.prototype.createTime = function(d, t) {
	var a = new Date(d.getTime());
	a.setHours(parseInt(t.substring(0, 2), 10), parseInt(t.substring(2, 4), 10));
	return a
};
hcm.mytimesheet.model.TimeEntry.prototype.setData = function(d) {
	if (d.FieldName === "TIME") {
		this.recordNumber = d.RecordNumber;
		this.time = parseFloat(d.FieldValue.trim());
		this.hours = Math.floor(this.time);
		this.minutes = Math.round((this.time - this.hours) * 60);
		this.startTime = d.StartTime;
		this.endTime = d.EndTime
	} else if (d.FieldName === "NOTES") {
		this.notes = d.FieldValueText;
		if (this.notes && this.notes.length > 0) {
			this.hasNotes = true
		}
	} else if (d.FieldName === "STARTTIME") {
		this.startTime = d.FieldValueText
	} else if (d.FieldName === "ENDTIME") {
		this.endTime = d.FieldValueText
	} else if (d.FieldName === "COUNTER") {
		this.counter = d.FieldValueText
	} else if (d.FieldName === "REASON") {
		this.rejectionReason = d.FieldValueText
	} else if (d.FieldName === "STATUS") {
		this.status = d.FieldValueText;
		this.statusId = d.FieldValue
	} else if (d.Level === "0") {
		this.mainItem = d.FieldValueText;
		this.mainCode = d.FieldValue;
		this.mainName = d.FieldName
	} else {
		if (this.subItems) {
			this.subItems += ", " + d.FieldValueText;
			this.childItems.push(d.FieldValueText);
			this.childCodes.push(d.FieldValue);
			this.childNames.push(d.FieldName)
		} else {
			this.subItems = d.FieldValueText;
			this.childItems = [d.FieldValueText];
			this.childCodes = [d.FieldValue];
			this.childNames = [d.FieldName]
		}
	}
};