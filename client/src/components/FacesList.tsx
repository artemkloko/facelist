import React, { memo } from "react";
import { FlatList, FlatListProps } from "react-native";
import { Avatar, ListItem } from "react-native-elements";

import { FaceFragment } from "../@types/api";

export type FaceListProps = Pick<
  FlatListProps<FaceFragment>,
  "data" | "onRefresh" | "onEndReached" | "refreshing"
>;

export const FacesList = memo<FaceListProps>(
  (props) => {
    return (
      <FlatList
        data={props.data}
        renderItem={({ item }) => <FacesListItem item={item} key={item.id} />}
        onRefresh={props.onRefresh}
        onEndReached={props.onEndReached}
        refreshing={props.refreshing}
      />
    );
  },
  (prevProps, nextProps) => {
    const same =
      prevProps.data === nextProps.data &&
      prevProps.refreshing === nextProps.refreshing;
    const shouldRender = !nextProps.refreshing && !same;
    return !shouldRender;
  }
);

type FacesListItemProps = { item: FaceFragment };

export const FacesListItem = memo<FacesListItemProps>(
  (props) => {
    return (
      <ListItem bottomDivider>
        <Avatar source={{ uri: props.item.avatar }} />
        <ListItem.Content>
          <ListItem.Title>{props.item.name}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  },
  (prevProps, nextProps) => {
    const same = prevProps.item === nextProps.item;
    const shouldRender = !same;
    return !shouldRender;
  }
);
