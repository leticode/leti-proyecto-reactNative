import { useState } from "react";
import { View, Text, FlatList, Modal, TextInput, Button, Pressable, StyleSheet } from "react-native";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [taskText, setTaskText] = useState("");

 /**  En esta funcion lo primero que hace es fijarse que la tarea que vamos a agregar no este vacia.
 * Si NO esta vacia, creamos un objeto llamado 'nuevasTareas' que va a tener un id y el texto ingresado por el usuario.
 * Despues cree un nuevo array llamado 'nuevasTareas', que tiene todas las tareas que ya existian mas la nueva tarea.
 * Actualizo el estado 'tasks' con el array de 'nuevasTareas'.
 * Borro el campo de texto y cierro el modal */

  const agregarTarea = () => {
    if (taskText.trim() != "") {
      const nuevaTarea = {
        id: Math.random().toString(),
        text: taskText,
      };

      const nuevasTareas = [...tasks, nuevaTarea];
      
      setTasks(nuevasTareas);
      setTaskText("");
      setModalVisible(false);
    }
  };

/* * Para eliminar una tarea, creo un nuevo array llamado 'nuevasTareas', el que comienza vacio.
 * Recorro todas las tareas   que ya existen y, si su id no coincide con el id  de la tarea que quiero eliminar, la agrego al nuevo array.
 * Actualizo el estado con este nuevo array que ya no tiene la tarea eliminada.
 */
const eliminarTarea = (id) => {
  const nuevaTareaEliminada = [];

  for (let task of tasks) {
    if (task.id !== id) {
      nuevaTareaEliminada.push(task);
    }
  }
  setTasks(nuevaTareaEliminada);
};

/**  Primero se muestra un botón llamado "Nueva tarea", que cuando lo tocas te va a abrir el modal (osea, su estado va a pasar a verdadero)
 * y te va a dar la opcion de: Agregar tarea o cancelar (si tocas cancelar el modal se cierra), tambien tenes un input en donde vas a escribir la tarea que queres agregar
 * Se muestran las listas de tareas usanddo FlatList, cuando el usuario toca una tarea, se ejecuta la funcion eliminarTarea() y la tarea se elimina de la lista.
 */

   return (
    <View style={styles.container}>
      <Button title="Nueva tarea" onPress={() => setModalVisible(true)}
      />

      <FlatList data={tasks} keyExtractor={(item) => item.id} renderItem={({ item }) => (
          <Pressable  onPress={() => eliminarTarea(item.id)} style={styles.task}>
            <Text style={styles.taskText}>{item.text}</Text>
            <Text style={styles.deleteText}>Tocar para eliminar la tarea</Text>
          </Pressable>
        )}/>

      <Modal visible={modalVisible}transparent={true}>

        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput placeholder="Ingrese una tarea" value={taskText} onChangeText={setTaskText} style={styles.input} />
            <View style={styles.buttonsContainer}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)}/>

              <Button title="Agregar" onPress={agregarTarea}/>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },

  task: {
    backgroundColor: "#a8dadc",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },

  taskText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  deleteText: {
    marginTop: 5,
    fontSize: 12,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});