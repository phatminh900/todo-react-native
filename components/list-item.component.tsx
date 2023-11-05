import { useState } from "react";
import { Pressable, StyleSheet, View, Text, Modal, Button } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ListItem = ({
  id,
  task,
  isChecked,
  onDelete,
  onToggleCheck,
}: {
  id: string;
  task: string;
  isChecked: boolean;
  onToggleCheck: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.left}>
          <Pressable
            android_ripple={{ color: "red" }}
            onPress={() => onToggleCheck(id)}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 9999,
                borderWidth: 2,
                alignItems: "center",
                justifyContent: "center",
                borderColor: "#9999",
              }}
            >
              {isChecked && <Icon name="check" size={15} color="#000" />}
            </View>
          </Pressable>

          <Text>{task}</Text>
        </View>
        <View>
          <Pressable onPress={() => setIsOpenModal(true)}>
            <Icon name="delete" size={20} color="#900" />
          </Pressable>
        </View>
      </View>
      <View style={styles.modalContainer}>
        <ConfirmModalDelete
          onCancel={() => setIsOpenModal(false)}
          onDelete={() => onDelete(id)}
          isOpen={isOpenModal}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    padding: 12,
  },
  modalContainer: {
    flex: 1,
    width: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  left: {
    flexDirection: "row",
    gap: 12,
  },
});

const ConfirmModalDelete = ({
  isOpen,
  onCancel,
  onDelete,
}: {
  onDelete: () => void;
  onCancel: () => void;
  isOpen: boolean;
}) => {
  return (
    <Modal style={{ padding: 50 }} visible={isOpen} animationType="fade">
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          gap: 12,
        }}
      >
        <Text>Are you sure to delete this task... </Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Button onPress={onCancel} title="Cancel" />
          <Button onPress={onDelete} title="Delete" color="#900" />
        </View>
      </View>
    </Modal>
  );
};
export default ListItem;
