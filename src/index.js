const express = require('express')
const wol = require('wake_on_lan')
const dotenv = require("dotenv")

dotenv.config()
const app = express()

const port = process.env.PORT;
const mac_address = process.env.MAC_ADDRESS

app.post('/api/wake', (req, res) => {
    wol.wake(mac_address, (err) => {
        if (err) {
            console.error('Failed to send Magic Packet', err)
            return res.status(500).json({
                success: false,
                msg: 'Failed to send Magic Packet'
            })
        }
    })

    return res.json({
        success: true,
        msg: 'Magic Packet successfully received.'
    })

})

app.listen(port, '0.0.0.0', () => {
    console.log(`Wake On Lan listeing on ${port}`)
})