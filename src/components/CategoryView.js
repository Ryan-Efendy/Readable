import React from 'react';
import { Image, Item } from 'semantic-ui-react';

const CategoryView = () =>
  <Item.Group>
    <Item>
      <Item.Image
        size="tiny"
        src="https://react.semantic-ui.com/assets/images/wireframe/image.png"
      />

      <Item.Content>
        <Item.Header as="a">Header</Item.Header>
        <Item.Meta>Description</Item.Meta>
        <Item.Description>
          <Image src="https://react.semantic-ui.com/assets/images/wireframe/short-paragraph.png" />
        </Item.Description>
        <Item.Extra>Additional Details</Item.Extra>
      </Item.Content>
    </Item>

    <Item>
      <Item.Image
        size="tiny"
        src="https://react.semantic-ui.com/assets/images/wireframe/image.png"
      />

      <Item.Content>
        <Item.Header as="a">Header</Item.Header>
        <Item.Meta>Description</Item.Meta>
        <Item.Description>
          <Image src="https://react.semantic-ui.com/assets/images/wireframe/short-paragraph.png" />
        </Item.Description>
        <Item.Extra>Additional Details</Item.Extra>
      </Item.Content>
    </Item>
  </Item.Group>;

export default CategoryView;
