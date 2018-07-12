const { Card } = require('dialogflow-fulfillment')

class FBCarousel extends Card {
  constructor (foo) {
    super(foo)
  }
}

module.exports = FBCarousel

/*
  ({
  items: [
    {
      description: 'Option One Description',
      image: {
        url: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
        accessibilityText: 'foo'
      },
      optionInfo: {
        key: 'foo',
        synonyms: ['foo one', 'foo one']
      },
      title: 'foo'
    },
    {
      description: 'Option Two Description',
      image: {
        url: 'https://lh3.googleusercontent.com/Nu3a6F80WfixUqf_ec_vgXy_c0-0r4VLJRXjVFF_X_CIilEu8B9fT35qyTEj_PEsKw',
        accessibilityText: 'bar'
      },
      optionInfo: {
        key: 'bar',
        synonyms: ['bar two', 'bar two']
      },
      title: 'bar'
    }
  ],
  platform: 'google',
  type: 'carousel_card'
})
*/
