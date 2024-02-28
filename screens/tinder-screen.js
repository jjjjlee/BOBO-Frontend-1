import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Button, Image, StyleSheet, View } from 'react-native'
import  { BottomBar } from '../components/tinder-components'
import Swipes from './tinder-swipe'

const DUMMY_DATA1 =[
    {   
        "gender": "female",
        "name": {
            "title": "Ms",
            "first": "Aurora",
            "last": "Marrero"
        },
        "location": {
            "street": {
                "number": 2744,
                "name": "Avenida Baja California Sur"
            },
            "city": "Fronteras",
            "state": "Baja California Sur",
            "country": "Mexico",
            "postcode": 11859,
            "coordinates": {
                "latitude": "25.8453",
                "longitude": "-130.8399"
            },
            "timezone": {
                "offset": "+5:30",
                "description": "Bombay, Calcutta, Madras, New Delhi"
            }
        },
        "email": "aurora.marrero@example.com",
        "login": {
            "uuid": "8db41410-5d83-4d75-b702-f3c4c787d9f9",
            "username": "beautifulcat952",
            "password": "info",
            "salt": "v1HmZCtp",
            "md5": "f01884a3de5f750b6e6ae110294e71ce",
            "sha1": "cf2d56b37b77870d91b85e131e100d10afd4a56b",
            "sha256": "100a02e6cf38f7cb7499110d699e431cb1ec8bb06bf18fc682d45f14bddef047"
        },
        "dob": {
            "date": "1956-12-26T20:04:01.474Z",
            "age": 67
        },
        "registered": {
            "date": "2017-11-26T07:25:56.900Z",
            "age": 6
        },
        "phone": "(674) 548 5956",
        "cell": "(639) 434 0583",
        "id": {
            "name": "NSS",
            "value": "16 92 59 6601 1"
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/women/30.jpg",
            "medium": "https://randomuser.me/api/portraits/med/women/30.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/women/30.jpg"
        },
        "tag":{
            "species":"黃金獵犬",
            "vaccined":"已施打疫苗",
            "weight":"20"
        },
        "description":"`我是一隻乖巧狗狗，我喜歡吃水果還有睡，還有玩球球"
    },
    {
        "gender": "female",
        "name": {
            "title": "Mrs",
            "first": "Ainhoa",
            "last": "Van Doremalen"
        },
        "location": {
            "street": {
                "number": 4456,
                "name": "Biezenmortelsestraat"
            },
            "city": "De Heurne",
            "state": "Zuid-Holland",
            "country": "Netherlands",
            "postcode": "0166 UG",
            "coordinates": {
                "latitude": "24.9485",
                "longitude": "-55.4650"
            },
            "timezone": {
                "offset": "+9:00",
                "description": "Tokyo, Seoul, Osaka, Sapporo, Yakutsk"
            }
        },
        "email": "ainhoa.vandoremalen@example.com",
        "login": {
            "uuid": "f65709e6-2bf3-49fa-b111-a0c6e722ee2b",
            "username": "whitekoala922",
            "password": "excalibu",
            "salt": "jTGbxWTK",
            "md5": "205e1355b1f0e09293d2888863313ea9",
            "sha1": "37d4f18a8cb4e724806862b47079d72f7a6a78a3",
            "sha256": "e5544839d2b241698df86775c587c66b5702d7a3f560f02c55200592ac49291e"
        },
        "dob": {
            "date": "1991-06-16T08:18:09.872Z",
            "age": 32
        },
        "registered": {
            "date": "2021-10-22T01:50:59.202Z",
            "age": 2
        },
        "phone": "(020) 4883794",
        "cell": "(06) 90338875",
        "id": {
            "name": "BSN",
            "value": "46550943"
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/women/40.jpg",
            "medium": "https://randomuser.me/api/portraits/med/women/40.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/women/40.jpg"
        },
        "tag":{
            "species":"黃金獵犬",
            "vaccined":"已施打疫苗",
            "weight":"20"
        },
        "description":"`我是一隻乖巧狗狗，我喜歡吃水果還有睡，還有玩球球"
    },
    {
        "gender": "female",
        "name": {
            "title": "Ms",
            "first": "Maria",
            "last": "Turner"
        },
        "location": {
            "street": {
                "number": 3401,
                "name": "Willis Street"
            },
            "city": "Nelson",
            "state": "Taranaki",
            "country": "New Zealand",
            "postcode": 96750,
            "coordinates": {
                "latitude": "5.7193",
                "longitude": "-170.9425"
            },
            "timezone": {
                "offset": "-8:00",
                "description": "Pacific Time (US & Canada)"
            }
        },
        "email": "maria.turner@example.com",
        "login": {
            "uuid": "6cb95e6e-df63-417d-a6cf-780dda424e3f",
            "username": "redbird260",
            "password": "trick",
            "salt": "X9Bs2u5N",
            "md5": "158cb1879bae2054be9bbb82b2c5b95e",
            "sha1": "bde459d5b7a9fd658304c12ef975330246f6846f",
            "sha256": "e4b22c07e0a895b8dd17622efcaf7e70954db72819407a2e08678ae87ff7595f"
        },
        "dob": {
            "date": "1998-06-26T01:30:53.507Z",
            "age": 25
        },
        "registered": {
            "date": "2021-07-17T12:22:31.252Z",
            "age": 2
        },
        "phone": "(697)-167-1844",
        "cell": "(604)-583-7955",
        "id": {
            "name": "",
            "value": null
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/women/38.jpg",
            "medium": "https://randomuser.me/api/portraits/med/women/38.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/women/38.jpg"
        },
        "tag":{
            "species":"黃金獵犬",
            "vaccined":"已施打疫苗",
            "weight":"20"
        },
        "description":"`我是一隻乖巧狗狗，我喜歡吃水果還有睡，還有玩球球"
    }
]

const DUMMY_DATA2 = [
    {
        "gender": "female",
        "name": {
            "title": "Mrs",
            "first": "Daisy",
            "last": "Fleming"
        },
        "location": {
            "street": {
                "number": 7262,
                "name": "Lakeview St"
            },
            "city": "Traralgon",
            "state": "South Australia",
            "country": "Australia",
            "postcode": 3567,
            "coordinates": {
                "latitude": "38.8186",
                "longitude": "-17.3167"
            },
            "timezone": {
                "offset": "+9:00",
                "description": "Tokyo, Seoul, Osaka, Sapporo, Yakutsk"
            }
        },
        "email": "daisy.fleming@example.com",
        "login": {
            "uuid": "180bc5d3-14f7-413b-a804-db47c6498cfa",
            "username": "sadleopard734",
            "password": "trident",
            "salt": "4P6fDrud",
            "md5": "080b81534ff16726d6795f0290caec3a",
            "sha1": "ea44d8b59cdb9fb8d35c3d314035759c061799f7",
            "sha256": "82fc7ead59e48d8d50614b4002ff56ba5e32ff966e06f30c23cc83f19f1ea9f3"
        },
        "dob": {
            "date": "1970-07-17T17:28:11.702Z",
            "age": 53
        },
        "registered": {
            "date": "2003-05-01T20:18:21.871Z",
            "age": 20
        },
        "phone": "03-6563-8633",
        "cell": "0448-097-573",
        "id": {
            "name": "TFN",
            "value": "670108984"
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/women/46.jpg",
            "medium": "https://randomuser.me/api/portraits/med/women/46.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/women/46.jpg"
        },
        "tag":{
            "species":"黃金獵犬",
            "vaccined":"已施打疫苗",
            "weight":"20"
        },
        "description":"`我是一隻乖巧狗狗，我喜歡吃水果還有睡，還有玩球球"
    },
    {
        "gender": "female",
        "name": {
            "title": "Ms",
            "first": "Tilde",
            "last": "Sørensen"
        },
        "location": {
            "street": {
                "number": 2534,
                "name": "Hvenekildeløkken"
            },
            "city": "Haslev",
            "state": "Nordjylland",
            "country": "Denmark",
            "postcode": 49725,
            "coordinates": {
                "latitude": "62.6022",
                "longitude": "-76.8343"
            },
            "timezone": {
                "offset": "+4:30",
                "description": "Kabul"
            }
        },
        "email": "tilde.sorensen@example.com",
        "login": {
            "uuid": "48df0362-6f58-4536-bb76-10fd7ea09e31",
            "username": "beautifulsnake390",
            "password": "kendra",
            "salt": "WqildXxN",
            "md5": "d3dc7a1ba8c615b5a63d427955a3bd0b",
            "sha1": "619aa80a95ba3edf126d777c2a44e97ac1e53660",
            "sha256": "3b7b09a33b2486b73aa08f5ef05125d1b11c390f63a117902ce6f5da07f5e9ec"
        },
        "dob": {
            "date": "1967-02-05T20:24:05.719Z",
            "age": 57
        },
        "registered": {
            "date": "2009-04-20T16:09:47.673Z",
            "age": 14
        },
        "phone": "61686983",
        "cell": "95654371",
        "id": {
            "name": "CPR",
            "value": "050267-7721"
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/women/90.jpg",
            "medium": "https://randomuser.me/api/portraits/med/women/90.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/women/90.jpg"
        },
        "tag":{
            "species":"黃金獵犬",
            "vaccined":"已施打疫苗",
            "weight":"20"
        },
        "description":"`我是一隻乖巧狗狗，我喜歡吃水果還有睡，還有玩球球"
    },
]
const TinderScreen = ()=>{
  const [dogs, setDogs] = useState(DUMMY_DATA1);
  const [currentIndex, setCurrentIndex] = useState(0);
  // Key helps to re-render
  const [key, setKey] = useState(0);
  const swipesRef = useRef(null);

  const handleKey = useCallback(()=>{
    setDogs(DUMMY_DATA2)
    setKey(key+0.001);
  },[key,dogs]);



  async function fetchData(){
    fetch('https://randomuser.me/api/?gender=female&results=50',{
        method: 'GET',
    }).then(res=>{return(res.json);
    }).then(res=>{
        console.log(res)
        setDogs(res);
    }).catch(err=>{console.log(err);});
  }
 
  async function fetchData(){

  }
  /* This is the initial fetching method
  useEffect(() => {
    fetchData()
  }, [])
  */

  /* Key change when the cards are all swiped, therefore after the key state change, we need to fetchData again
  useEffect(()=>{
    fetchData()
  },[key])
  */
  function handleLikePress() {
    swipesRef.current.swipeRight()
  }
  function handlePassPress() {
    swipesRef.current.swipeLeft()
  }

  return (
    <View style={styles.container} >
      <Swipes
        key = {key}
        swipesRef={swipesRef}
        dogs = {dogs}
        currentIndex = {currentIndex}
        onSwipedAll = {handleKey}/>
      <BottomBar handleLikePress={handleLikePress} handlePassPress={handlePassPress} />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  },
  photo: {
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  textContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textPrimary: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
  },
  textSecondary: {
    color: 'white',
    marginLeft: 10,
    fontSize: 25,
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.80)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  title_frame: {
    flexShrink: 0,
    width: 318,
    flexDirection: "row",
    alignItems: "flex-end",
    columnGap: 12
},
  title:{
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20
  },
  title_name:{
    flexShrink: 0,
    textAlign: "left",
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "PingFang TC",
    fontSize: 32,
    fontWeight: "600",
    letterSpacing: 1.6
  },
  title_age:{
    flexShrink: 0,
    textAlign: "left",
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "PingFang TC",
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 1
  },
  detail_frame:{
    flexShrink: 0,
    alignItems: "flex-start",
    rowGap: 12
  },
  tags:{
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "flex-start",
    columnGap: 8
  },
  tag:{
    flexShrink: 0,
    backgroundColor: "rgba(255, 234, 218, 1)",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8
  },
  tag_text:{
    flexShrink: 0,
    textAlign: "left",
    color: "rgba(237, 116, 34, 1)",
    fontFamily: "PingFang TC",
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 0.6
  },
  location:{
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4
  },
  loc_text:{
    flexShrink: 0,
    textAlign: "left",
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "PingFang TC",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 0.7
  },
  description_frame:{
    flexShrink: 0,
    height: 17,
    width: 335,
    alignItems: "flex-start",
    rowGap: 0
  },
  description_text:{
    position: "absolute",
    flexShrink: 0,
    top: 0,
    right: 0,
    bottom: -3,
    left: 0,
    textAlign: "left",
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "PingFang TC",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 0.7
  }

})

export default TinderScreen;