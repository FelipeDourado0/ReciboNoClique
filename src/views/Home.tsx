import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { ReciboModel } from "../models/ReciboForm";

const Home = () => {
  //state geral do form
  const [dados, setDados] = React.useState<ReciboModel>({} as ReciboModel);
  //state do showPicker
  const [showPicker, setShowPicker] = React.useState<boolean>(false);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChangePicker = (
    event: DateTimePickerEvent,
    dataSelecionada?: Date
  ) => {
    if (event.type == "set") {
      if (Platform.OS === "android") {
        const dadosNovos = dados;
        if (dataSelecionada == undefined) {
          dataSelecionada = new Date();
        }
        dadosNovos.dataPagamento = dataSelecionada;
        setDados(dadosNovos);

        toggleDatePicker();
      }
    } else {
      toggleDatePicker();
    }
  };

  const confirmIOSDate = () => {
    toggleDatePicker();
  };

  const formatDate = (date: Date) => {
    const day =
      date.getDate() <= 10
        ? "0" + date.getDate().toString()
        : date.getDate().toString();

    const month =
      date.getMonth() + 1 <= 10
        ? "0" + (date.getMonth() + 1).toString()
        : date.getMonth() + 1;

    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
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
              label="Nome do cliente"
              outlineColor="#000000"
              activeOutlineColor="#FFD600"
              placeholderTextColor="#a3a3a3"
              style={styles.input}
              onChangeText={(e) =>
                setDados((prev) => ({ ...prev, nomePagador: e }))
              }
              value={dados?.nomePagador}
              keyboardType="default"
            />
            <TextInput
              mode="outlined"
              label="CPF/CNPJ do cliente"
              outlineColor="#000000"
              activeOutlineColor="#FFD600"
              placeholderTextColor="#a3a3a3"
              style={styles.input}
              onChangeText={(e) =>
                setDados((prev) => ({ ...prev, cpfCnpjPagador: e }))
              }
              value={dados?.cpfCnpjPagador}
              keyboardType="decimal-pad"
            />
            <TextInput
              mode="outlined"
              label="Nome do beneficiário"
              outlineColor="#000000"
              activeOutlineColor="#FFD600"
              placeholderTextColor="#a3a3a3"
              style={styles.input}
              onChangeText={(e) =>
                setDados((prev) => ({ ...prev, nomeBeneficiario: e }))
              }
              value={dados?.nomeBeneficiario}
              keyboardType="default"
            />
            <TextInput
              mode="outlined"
              label="CPF/CNPJ do beneficiário"
              outlineColor="#000000"
              activeOutlineColor="#FFD600"
              placeholderTextColor="#a3a3a3"
              style={styles.input}
              onChangeText={(e) =>
                setDados((prev) => ({ ...prev, cpfCnpjBeneficiario: e }))
              }
              value={dados?.cpfCnpjBeneficiario}
              keyboardType="decimal-pad"
            />
            {showPicker && (
              <DateTimePicker
                style={styles.datePicker}
                mode="date"
                display="spinner"
                value={
                  dados?.dataPagamento == undefined
                    ? new Date()
                    : dados?.dataPagamento
                }
                onChange={onChangePicker}
              />
            )}
            {showPicker && Platform.OS === "ios" && (
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                  style={[
                    styles.pickerButton,
                    styles.button,
                    { backgroundColor: "#11182711" },
                  ]}
                  onPress={toggleDatePicker}
                >
                  <Text style={[styles.buttonText, { color: "#075985" }]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.pickerButton, styles.button]}
                  onPress={confirmIOSDate}
                >
                  <Text style={[styles.buttonText]}>Confirm</Text>
                </TouchableOpacity>
              </View>
            )}

            <Pressable onPress={toggleDatePicker}>
              <TextInput
                mode="outlined"
                label="Data do pagamento"
                outlineColor="#000000"
                activeOutlineColor="#FFD600"
                placeholderTextColor="#a3a3a3"
                style={styles.input}
                value={
                  dados?.dataPagamento == undefined
                    ? ""
                    : formatDate(dados?.dataPagamento)
                }
                keyboardType="default"
                editable={false}
                onPressIn={toggleDatePicker}
              />
            </Pressable>

            <TextInput
              mode="outlined"
              label="Valor"
              outlineColor="#000000"
              activeOutlineColor="#FFD600"
              placeholderTextColor="#a3a3a3"
              style={styles.input}
              onChangeText={(e) => setDados((prev) => ({ ...prev, valor: e }))}
              value={dados?.valor}
              keyboardType="decimal-pad"
            />

            <TextInput
              mode="outlined"
              outlineColor="#000000"
              activeOutlineColor="#FFD600"
              placeholderTextColor="#a3a3a3"
              label="Descrição"
              multiline={true}
              numberOfLines={3}
              style={styles.inputDescricao}
              onChangeText={(e) => setDados((prev) => ({ ...prev, motivo: e }))}
              value={dados?.motivo}
              keyboardType="ascii-capable"
            />

            <Button mode="contained" style={styles.buttonGerar}>
              GERAR RECIBO
            </Button>
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
    backgroundColor: "#ffffff",
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
    fontWeight: "500",
    marginTop: 15,
    marginBottom: 15,
  },
  subtitulo: {
    width: "100%",
    height: "auto",
    textAlign: "left",
    fontSize: 16,
    color: "#000000",
    marginBottom: 15,
    fontWeight: "400",
  },
  input: {
    width: "100%",
    height: 45,
    marginBottom: 15,
    backgroundColor: "#ffffff",
  },
  datePicker: {
    height: 120,
    margin: -10,
  },
  inputDescricao: {
    width: "100%",
    height: 60,
    marginBottom: 15,
    paddingBottom: 12,
    backgroundColor: "#ffffff",
  },
  pickerButton: {
    paddingHorizontal: 20,
  },
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: "#075985",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
  },
  buttonGerar: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: "#FFD600",
    fontSize: 14,
    fontWeight: "800",
    color: "#fff",
  },
});

export default Home;
