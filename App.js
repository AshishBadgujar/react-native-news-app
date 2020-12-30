import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import moment from 'moment'
import { WebView } from 'react-native-webview';

const App = () => {
  const [dark, setdark] = useState(false)
  const [articles, setarticles] = useState([])

  useEffect(() => {
    fetch(`http://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=b4592102540d431295eded083a5d7c9a`)
      .then(res => res.json())
      .then(res2 => { setarticles(res2.articles) })
  }, [])

  const handleWeb = (url) => {
    console.log("clicked")
    return (
      <WebView source={{ uri: url }} />
    )
  }

  let backColor = (dark) ? "#333" : "#ffff";
  let textColor = (dark) ? "#ffff" : "black";
  return (
    <>
      <View style={{
        backgroundColor: backColor,
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        elevation: 5
      }}>
        <Text style={{
          color: textColor,
          fontSize: 27
        }}>News</Text>
        <MaterialIcons name="invert-colors" size={30} color={textColor} onPress={() => setdark(!dark)} />
      </View>
      <View style={{
        padding: 5,
        backgroundColor: backColor,
        flex: 1
      }}>
        <FlatList
          data={articles}
          renderItem={({ item }) => {
            return (
              <View style={{
                backgroundColor: backColor,
                padding: 5,
                marginTop: 10,
              }}>
                <Image source={{ uri: item.urlToImage }} style={{ height: 180, width: "100%" }} />
                <Text style={{ color: textColor, fontSize: 20, marginTop: 5 }} onPress={() => handleWeb(item.url)}>
                  {item.title}
                </Text>
                <Text style={{ color: textColor, fontSize: 15, marginTop: 5 }}>
                  {item.description}
                </Text>
                <Text style={{ color: textColor, fontSize: 10, marginTop: 5 }}>
                  {moment(item.publishedAt).fromNow()}
                </Text>
              </View>
            )
          }}
        />

      </View>
    </>
  )
}

export default App
