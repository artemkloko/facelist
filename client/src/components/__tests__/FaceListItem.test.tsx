import React from "react";
import { shallow } from "enzyme";

import { FacesListItem } from "../FacesList";

describe("FaceListItem", () => {
  const a = { id: "a", avatar: "aAvatar", name: "aName" };
  const useWrapper = () => {
    const wrapper = shallow(<FacesListItem item={a} />);
    return wrapper;
  };

  it("should render a ListItem with avatar and name", () => {
    const wrapper = useWrapper();
    expect(wrapper).toMatchSnapshot();
  });
});
