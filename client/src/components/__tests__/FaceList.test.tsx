import React from "react";
import { shallow } from "enzyme";
import { FlatList } from "react-native";

import { FacesList } from "../FacesList";

describe("FaceList", () => {
  const a = { id: "a", avatar: "aAvatar", name: "aName" };
  const b = { id: "b", avatar: "bAvatar", name: "bName" };
  const onRefresh = () => "a";
  const onEndReached = () => "b";
  const useWrapper = () => {
    const wrapper = shallow(
      <FacesList
        data={[a, b]}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        refreshing={false}
      />
    );
    return wrapper;
  };

  it("should render a FlatList", () => {
    const wrapper = useWrapper();
    expect(wrapper).toMatchSnapshot();
  });

  it("should pass specific props to FlatList", () => {
    const wrapper = useWrapper();
    const flatListWrapper = wrapper.find(FlatList);
    expect(flatListWrapper.getElements().length).toBeGreaterThan(0);
    const flatList = flatListWrapper.dive();
    expect(flatList.prop("data")).toEqual([a, b]);
    expect(flatList.prop("onRefresh")).toEqual(onRefresh);
    expect(flatList.prop("onEndReached")).toEqual(onEndReached);
    expect(flatList.prop("refreshing")).toEqual(false);
  });
});
