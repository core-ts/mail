"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleMailService = (function () {
  function SimpleMailService(transporter) {
    this.transporter = transporter;
    this.send = this.send.bind(this);
  }
  SimpleMailService.prototype.send = function (m) {
    var mail = {
      from: getAddress(m.from),
      to: getToAddress(m.to),
      cc: getToAddress(m.cc),
      bcc: getToAddress(m.bcc),
      subject: m.subject,
      text: m.text,
      html: m.html,
    };
    return this.transporter.sendMail(mail).then(function () {
      return true;
    });
  };
  return SimpleMailService;
}());
exports.SimpleMailService = SimpleMailService;
function getAddress(mail) {
  if (typeof mail === 'string') {
    return mail;
  }
  else {
    if (mail.name && mail.name.length > 0) {
      return { name: mail.name, address: mail.email };
    }
    else {
      return mail.email;
    }
  }
}
exports.getAddress = getAddress;
function getAddressOnly(mail) {
  if (typeof mail === 'string') {
    return { name: mail, address: mail };
  }
  else {
    if (mail.name && mail.name.length > 0) {
      return { name: mail.name, address: mail.email };
    }
    else {
      return { name: mail.email, address: mail.email };
    }
  }
}
exports.getAddressOnly = getAddressOnly;
function getToAddress(mail) {
  if (!mail) {
    return undefined;
  }
  if (Array.isArray(mail)) {
    if (mail.length === 1) {
      return getAddress(mail[0]);
    }
    else if (mail.length === 0) {
      return undefined;
    }
    else {
      var arr = [];
      for (var _i = 0, mail_1 = mail; _i < mail_1.length; _i++) {
        var obj = mail_1[_i];
        var m = getAddressOnly(obj);
        arr.push(m);
      }
      return arr;
    }
  }
  else {
    return getAddress(mail);
  }
}
exports.getToAddress = getToAddress;
