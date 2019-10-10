'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
class Client {
  constructor(clientId, clientName, clientDescription, billedTotal) {
    this.id = 0
    this.name = ''
    this.description = ''
    this.billedTotal = 0
    this.id = clientId
    this.name = clientName
    this.description = clientDescription
    this.billedTotal = billedTotal
  }
}
exports.Client = Client
