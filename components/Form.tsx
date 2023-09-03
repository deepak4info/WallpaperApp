import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const styles = StyleSheet.create(
    {
        text: {
            fontSize: 20,
            color: 'blue',
            backgroundColor: 'yellow'
        }
    }
)


const form = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [emailid, setEmailid] = useState("");
    const [display, setDisplay] = useState(false)

    const clearData = () =>{

        setDisplay(false)
        setEmailid("")
        setPassword("")
        setName("")
    }


    return (
        <View>
            <Text>Bio Data Form</Text>
            <TextInput style={{ height: 40, margin: 12, borderWidth: 1, padding: 10, }} placeholder='Enter your name'  onChangeText={(text)=>setName(text)} value={name}></TextInput>
            <TextInput style={{ height: 40, margin: 12, borderWidth: 1, padding: 10, }} placeholder='Enter your email'  onChangeText={(text)=>setEmailid(text)}  value={emailid}></TextInput>
            <TextInput style={{ height: 40, margin: 12, borderWidth: 1, padding: 10, }} placeholder='Enter your password' onChangeText={(text)=>setPassword(text)} secureTextEntry value={password}></TextInput>

            <View style={{ paddingBottom: 5 }}>
                <Button title={'Enter'} onPress={()=>setDisplay(true)}></Button>
            </View>
            <View>
                <Button title={'Clear'} onPress={clearData}></Button>
            </View>


            <View>
                {
                    display ? <View>
                        <Text style={styles.text}>Bio Data Form</Text>
                        <Text>Your Name : {name}</Text>
                        <Text>Your password : {password}</Text>
                        <Text>Bio Data Form: {emailid}</Text>

                    </View>
                        :
                        null
                }
            </View>
        </View>
    )

            }

export default form