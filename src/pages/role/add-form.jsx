import React, {Component} from 'react';
import {Form, Input} from 'antd';
import PropTyprs from 'prop-types';

const Item = Form.Item;

/**
 * 应用组件
 */
export default class AddForm extends Component {

    formRef = React.createRef();

    static propTypes = {
        setForm: PropTyprs.func.isRequired
    }

    onInputChange = (event) => {
        console.info(event.target.value);
        console.info(this.formRef.current);
        this.formRef.current.setFieldsValue({
            roleName: event.target.value
        });
    }

    componentWillMount() {
        this.props.setForm(this.formRef);
    }

    render() {
        return (
            <Form ref={this.formRef}>
                <Item name='roleName' label='角色名称'
                      rules={[{required: true, message: 'Please Select Role Name!'}]}>
                    <Input placeholder='请输入分类名称' onChange={this.onInputChange}></Input>
                </Item>
            </Form>
        )
    }
}


