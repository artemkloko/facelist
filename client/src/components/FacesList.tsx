import React, { memo } from "react";
import { FlatList, FlatListProps } from "react-native";
import { Avatar, ListItem } from "react-native-elements";

import { FaceFragment } from "../@types/api";

export type FaceListProps = Pick<
  FlatListProps<FaceFragment>,
  "data" | "onRefresh" | "onEndReached" | "refreshing"
>;

export const FacesList = memo<FaceListProps>((props) => {
  return (
    <FlatList
      data={props.data}
      renderItem={({ item }) => <FacesListItem item={item} key={item.id} />}
      onRefresh={props.onRefresh}
      onEndReached={props.onEndReached}
      refreshing={props.refreshing}
    />
  );
});

type FacesListItemProps = { item: FaceFragment };

export const FacesListItem = memo<FacesListItemProps>((props) => {
  return (
    <ListItem bottomDivider>
      <Avatar source={{ uri: props.item.avatar }} />
      <ListItem.Content>
        <ListItem.Title>{props.item.name}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
});
