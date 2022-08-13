import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { styles } from "./styles";
import { Participant } from "../../components/Participant";
import { useState } from 'react';

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState("");

  function handleParticipantAdd() {
    if(participantName === ""){
      return Alert.alert("Não foi possível adicionar","Digite um nome.")

    }
    if(participants.includes(participantName)){
      return Alert.alert("Participante Existe","Já existe um participante na lista com esse nome.")
    }

    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName("");
  }
  function handleParticipantRemove(name: String) {
    return Alert.alert("Remover",`Remover o participante ${name}?`,[
      {
        text: "Sim",
        onPress: () =>   setParticipants(prevState =>prevState.filter(participant => participant !== name))

      },
      {
        text: "Não",
        style: 'cancel'
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Churrasco Casa NOVA</Text>
      <Text style={styles.eventDate}>Sábado, 13 de Agosto de 2022.</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setParticipantName}
          value={participantName}
        ></TextInput>

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(`${item}`)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmpty}>
            Não temos participantes na lista
          </Text>
        )}
      />
    </View>
  );
}
