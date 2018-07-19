module.exports = req => ({
  attachment: {
    type: 'template',
    payload: {
      template_type: 'generic',
      elements: [
        {
          title: 'Hyperledger 101',
          image_url: `https://scontent.fbkk2-2.fna.fbcdn.net/v/t1.0-9/34794693_10155998076087479_3811012266577362944_n.jpg?_nc_cat=0&_nc_eui2=AeFcCK9v87b5B-BbpPAhoU2Ing-_26MwYfyBPCWzHyZMNinVMMR8zYX7yEI42UAiDDPZSa_a2oBus9G59wyCsp8vU3bhCek26GKZ1ygZeIZRng&oh=a37021d18af6f714cf77b43c65324ed7&oe=5BC5D293`,
          subtitle: 'Saturday, July 28 at 1:00 PM Knowledge Exchange Center - kx',
          default_action: {
            type: 'web_url',
            url: 'https://www.facebook.com/events/616312025409172/'
          },
          buttons: [
            {
              type: 'web_url',
              url: 'https://www.facebook.com/events/616312025409172/',
              title: 'See more detail'
            },
            {
              type: 'postback',
              title: 'Join Hyperledger 101',
              payload: 'Join Hyperledger 101'
            }
          ]
        },
        {
          title: 'Stellar 101',
          image_url: `https://scontent.fbkk2-2.fna.fbcdn.net/v/t1.0-9/29511110_10155830964722479_553681704110319426_n.jpg?_nc_cat=0&_nc_eui2=AeH98IVglela-LVN3vdiAeiX7eJPRK3KupdEmS1e9HXgLgqyp97mzrjJ9JG5gop725LU5VgZNSq9U6I7mB9QjB9dhqHZeylw5JnuOHOc3k2OAQ&oh=355a8b6399aa425ea96bdca846ab55d6&oe=5BC97552`,
          subtitle: 'Sunday, July 29 at 1:00 PM Knowledge Exchange Center - kx',
          default_action: {
            type: 'web_url',
            url: 'https://www.facebook.com/groups/164076170920853/'
          },
          buttons: [
            {
              type: 'web_url',
              url: 'https://www.facebook.com/events/616312025409172/',
              title: 'See more detail'
            },
            {
              type: 'postback',
              title: 'Join Stellar 101',
              payload: 'Join Stellar 101'
            }
          ]
        }
      ]
    }
  }
})
