import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState } from "react";
import { Audio } from "expo-av";
import playSonido from "../utility/playSound";

export default function Buttonc(props) {

    const { run, setRun } = props;
    const sonido = require("../../assets/ruiditoboton.mp3")

    const cambiarEstado = () => {
        setRun(!run)
        playSonido(sonido);
    }



    return (
        <View style={styles.container}>
            <Pressable onPress={cambiarEstado}>
                <Text style={styles.texto}>
                    {run ? "Parar" : "Iniciar"}
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#cfcfcf",  // Fondo gris más claro
        height: 62,
        borderRadius: 20,
        borderColor: 'black',     // Usamos borderColor en lugar de borderBlockColor
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,

        // Sombra 3D
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8, // Android
    },
    texto: {
        fontSize: 45,
        color: 'white',            // Letras blancas
        fontWeight: "bold",

        // Simulación de borde negro
        textShadowColor: "black",
        textShadowOffset: { width: -2, height: 2 },
        textShadowRadius: 1.5,
    }
});
