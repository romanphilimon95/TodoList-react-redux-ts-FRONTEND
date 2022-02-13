// redux
import { removeAlert } from '../../redux/slices/errorAlertSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType, AppDispatchType } from '../../redux/reduxTypes';
// other
import { Alert } from 'reactstrap';
import './ErrorAlert.scss';

const ErrorAlert = () => {
    const { isOpened, text } = useSelector((state: RootStateType) => state.errorAlert.alertData);
    const dispatch: AppDispatchType = useDispatch();

    return (
        <div className="alert-wrapper">
            <Alert
                isOpen={isOpened}
                color="danger"
                toggle={() => dispatch(removeAlert())}
            >
                {text}
            </Alert>
        </div>
    )
}

export default ErrorAlert;