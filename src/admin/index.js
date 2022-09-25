import { Stack } from "@mui/material"
import { Typography } from "antd"
import Logo from "../components/layout/partials/Logo"

const AdminPage = () => {
    return (
        <Stack height='100%' width='100%' sx={{
            backgroundColor: '#001529'
        }}>
            <Stack direction={'column'} justifyContent='center' alignItems='center' height='80%'>
                <Logo width={500} height={500}/>
                <Typography className="text-admin" style={{
                    fontSize: '40px',
                    fontWeight: 700,
                    textTransform: 'uppercase'
                }}>Welcome to Admin <Typography style={{ letterSpacing: '2px', display: 'inline-block' }}>SIC</Typography></Typography>
            </Stack>
        </Stack>
    )
}

export default AdminPage