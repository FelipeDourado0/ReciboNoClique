import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import { ReciboModel } from "../models/ReciboForm";

const Home = () => {
  const [dados, setDados] = React.useState<ReciboModel>({} as ReciboModel);
  const [data, setData] = React.useState<Date>(new Date());
  const [showPicker, setShowPicker] = React.useState<boolean>(false);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ( event: Event , dataSelecionada: Date) => {
    if (event.type == "set") {
      const dataAtual = dataSelecionada;
      setData(dataAtual);
    } else {
      toggleDatePicker();
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.marginGlobal}>
          <View style={styles.view}>
            <Text style={styles.reciboTitulo}>RECIBO NO CLIQUE</Text>
            <Text style={styles.subtitulo}>Preencha o formulário abaixo:</Text>
            <TextInput
              mode="outlined"
              outlineColor="#ffffff"
              activeOutlineColor="#FFD600"
              placeholderTextColor="#a3a3a3"
              style={styles.input}
              onChangeText={(e) =>
                setDados((prev) => ({ ...prev, nomePagador: e }))
              }
              value={dados?.nomePagador}
              placeholder="Nome do cliente"
              keyboardType="default"
            />
            <TextInput
              mode="outlined"
              outlineColor="#ffffff"
              activeOutlineColor="#FFD600"
              placeholderTextColor="#a3a3a3"
              style={styles.input}
              onChangeText={(e) =>
                setDados((prev) => ({ ...prev, cpfCnpjPagador: e }))
              }
              value={dados?.cpfCnpjPagador}
              placeholder="CPF/CNPJ do cliente"
              keyboardType="decimal-pad"
            />
            <TextInput
              mode="outlined"
              outlineColor="#ffffff"
              activeOutlineColor="#FFD600"
              placeholderTextColor="#a3a3a3"
              style={styles.input}
              onChangeText={(e) =>
                setDados((prev) => ({ ...prev, nomeBeneficiario: e }))
              }
              value={dados?.nomeBeneficiario}
              placeholder="Nome do beneficiário"
              keyboardType="default"
            />
            <TextInput
              mode="outlined"
              outlineColor="#ffffff"
              activeOutlineColor="#FFD600"
              placeholderTextColor="#a3a3a3"
              style={styles.input}
              onChangeText={(e) =>
                setDados((prev) => ({ ...prev, cpfCnpjBeneficiario: e }))
              }
              value={dados?.cpfCnpjBeneficiario}
              placeholder="CPF/CNPJ do beneficiário"
              keyboardType="decimal-pad"
            />
            {showPicker && (
              <DateTimePicker
                style={styles.input}
                mode="date"
                display="spinner"
                value={data}
                onChange={(e) => onChange}
              />
            )}
            <Pressable onPress={toggleDatePicker}>
              <TextInput
                mode="outlined"
                outlineColor="#ffffff"
                activeOutlineColor="#FFD600"
                placeholderTextColor="#a3a3a3"
                style={styles.input}
                value={
                  dados?.dataPagamento == undefined
                    ? ""
                    : dados?.dataPagamento.toDateString()
                }
                placeholder="Data do pagamento"
                keyboardType="default"
                editable={false}
              />
            </Pressable>
            <TextInput
              mode="outlined"
              outlineColor="#ffffff"
              activeOutlineColor="#FFD600"
              placeholderTextColor="#a3a3a3"
              multiline={true}
              numberOfLines={3}
              style={styles.inputDescricao}
              onChangeText={(e) => setDados((prev) => ({ ...prev, motivo: e }))}
              value={dados?.motivo}
              placeholder="Descrição"
              keyboardType="ascii-capable"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#e9e9e9",
  },
  scrollView: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  text: {
    fontSize: 42,
  },
  marginGlobal: {
    padding: 20,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  view: {
    width: "100%",
    height: "100%",
  },
  reciboTitulo: {
    width: "100%",
    height: "auto",
    textAlign: "center",
    fontSize: 32,
    color: "#FFD600",
    marginBottom: 15,
  },
  subtitulo: {
    width: "100%",
    height: "auto",
    textAlign: "left",
    fontSize: 16,
    color: "#000000",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    height: 45,
    marginBottom: 15,
  },
  inputDescricao: {
    width: "100%",
    height: 60,
    marginBottom: 15,
    paddingBottom: 12,
  },
});

export default Home;
