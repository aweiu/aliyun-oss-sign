/**
 * Created by awei on 2016/8/1.
 */
import crypto from 'crypto'
export default function (config) {
  var expiration = new Date()
  expiration.setMilliseconds(expiration.getMilliseconds() + config.expiration)
  var policyBase64 = new Buffer(
    JSON.stringify(
      {
        expiration: expiration,
        conditions: [
          ['content-length-range', 0, config.contentLength]
        ]
      }
    )
  ).toString('base64')
  return {
    policy: policyBase64,
    OSSAccessKeyId: config.accessId,
    signature: crypto.createHmac('sha1', config.accessKey).update(policyBase64).digest().toString('base64')
  }
}
