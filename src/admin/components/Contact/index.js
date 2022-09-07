import { Table, Tag, Modal } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import config from '../../../db.config';
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Stack } from '@mui/material'

const Contact = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setLoading(true)
        handleGetData()
    }, [])
    const handleGetData = () => {
        axios.get(`${config.API_URL}/api/contact`).then((res) => {
            setLoading(false)
            setData(res.data)
        })
    }
    const handleReaded = (id) => {
        axios.patch(`${config.API_URL}/api/contact/${id}`, {readed: true}).then(() => handleGetData())
    }
    const handleDelete = (id) => {
        axios.delete(`${config.API_URL}/api/contact/delete/${id}`).then(() => handleGetData())
    }
    return (
        <Table
            dataSource={data}
            loading={loading}
            columns={[
                {
                    title: 'Họ Tên',
                    dataIndex: ['name']
                },
                {
                    title: 'Email',
                    dataIndex: ['email']
                },
                {
                    title: 'Lời Nhắn',
                    dataIndex: ['message']
                },
                {
                    title: 'Status',
                    dataIndex: ['readed'],
                    render(value) {
                        return value ? <Tag color={'green'}>{'Đã Đọc'}</Tag> : <Tag color={'volcano'}>{'Chưa Đọc'}</Tag>
                    }
                },
                {
                    title: 'Action',
                    dataIndex: ['_id'],
                    render(value) {
                        return (
                            <Stack direction='row' gap='10px'>
                                <EyeOutlined style={{color: 'blue'}} onClick={() => handleReaded(value)}/>
                                <DeleteOutlined style={{color: 'red'}} onClick={() => handleDelete(value)}/>
                            </Stack>
                        )
                    }
                },
            ]}
        />
    )
}

export default Contact