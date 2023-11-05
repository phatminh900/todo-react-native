import { FlatList } from "react-native";
import ListItem from "./list-item.component";
import { ITask } from "../App";

const List = ({
  list,
  onToggleCheck,
  onDelete,
}: {
  onToggleCheck: (id: string) => void;
  onDelete: (id: string) => void;
  list: ITask[];
}) => {
  return (
    <>
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <ListItem
            onToggleCheck={onToggleCheck}
            onDelete={onDelete}
            {...item}
          />
        )}
      />
    </>
  );
};
export default List;
