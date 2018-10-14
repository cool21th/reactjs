import React, { Component } from "react";
import styled from "styled-components";
import oc from "open-color";
import Modal from "./Modal";
import Input from "./Input";
import Thumbnail from "./Thumbnail";
import PropTypes from "prop-types";
import RemoveIcon from 'react-icons/lib/md/remove-circle'


const ThumbnailWrapper = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  display: flex;
  justify-content: center;

  background: white;
`;
const Form = styled.div`
  padding: 1rem;

  background: ${oc.gray[0]};
`;
const Button = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  flex: 1;
  display: inline-block;

  cursor: pointer;
  text-align: center;
  font-weight: 500;
  font-size: 1.2rem;
  transition: all 0.3s;

  color: white;
  background: ${props => oc[props.color][7]};

  &:hover {
    background: ${props => oc[props.color][6]};
  }
  &:active {
    background: ${props => oc[props.color][8]};
  }
`;
const RemoveButton = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;

  color: ${oc.gray[6]};

  cursor: pointer;
  font-size: 2rem;

  &:hover {
      color: ${oc.red[6]};
  }
  &:active {
      color: ${oc.red[7]};
  }

  ${props => !props.visible && 'display: none;'}
`
RemoveButton.propTypes= {
    visible: PropTypes.bool
}

const ButtonWrapper = styled.div`
  display: flex;
`;
export class ContactModal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    mode: PropTypes.oneOf(["create", "modify"]),
    name: PropTypes.string,
    phone: PropTypes.string,
    color: PropTypes.string,
    onHide: PropTypes.func,
    onAction: PropTypes.func,
    onRemove: PropTypes.func
  };
  handleChange = e => {
    const { onChange } = this.props;
    onChange({
      name: e.target.name,
      value: e.target.value
    });
  };
  render() {
    const { handleChange } = this;
    const { visible, mode, name, phone, color, onHide, onAction, onRemove } = this.props;
    return (
      <Modal visible={visible} onHide={onHide}>
        <ThumbnailWrapper>
            <RemoveButton
                visible={mode==='modify'}
                onClick={onRemove}>
                <RemoveIcon/>
            </RemoveButton>
          <Thumbnail Size="8rem" color={color} />
        </ThumbnailWrapper>
        <Form>
          <Input
            name="name"
            placeholder="이름"
            value={name}
            onChange={handleChange}
          />
          <Input
            name="phone"
            placeholder="전화번호"
            value={phone}
            onChange={handleChange}
          />
        </Form>
        <ButtonWrapper>
          <Button color="teal" onClick={onAction}>
            {mode === "create" ? "추가" : "수정"}
          </Button>
          <Button onClick={onHide} color="gray">
            취소
          </Button>
        </ButtonWrapper>
      </Modal>
    );
  }
}

export default ContactModal;
