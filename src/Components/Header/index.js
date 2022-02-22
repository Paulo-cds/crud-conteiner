import './styleHeader.scss'
import {useNavigate} from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    return(
        <div className="header">
            <ul>
                <li onClick={() => navigate('/')}>Home</li>
                <li onClick={() => navigate('/conteiners')}>Conteiners</li>
                <li onClick={() => navigate('/movimentacoes')}>Movimentacoes</li>
                <li onClick={() => navigate('/relatorios')}>Relatorios</li>
            </ul>
        </div>
    )
}

export default Header