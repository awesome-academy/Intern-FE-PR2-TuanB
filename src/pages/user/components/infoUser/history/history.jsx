import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Col, Container, Row, Table } from 'reactstrap';
import { AUTHORS, FETCH_DATA_SUCCESS, TAB_HISTORY_USER } from '../../../../../constants';
import { theme } from '../../../../../styles/theme';
import { getHistory } from '../../../../author/authorSlice';
import { clearPaymentSuccess, paymentReset, rePayment } from '../../../../ticket/components/InfoPayment/InfoPaymentSlice';
import { resetSeats } from '../../../../ticket/ticketSlice';
import * as F from '../styled-infoUSer'

function History({ tab }) {
    const dispatch = useDispatch()
    const { history } = useSelector((state) => state.author)
    const { paymentSuccess, infoPayment } = useSelector((state) => state.payment)
    const notifyPaymentSuccess = () => toast.success(AUTHORS.history.notify_payment_success);

    useEffect(() => {
        if (tab === TAB_HISTORY_USER) {
            dispatch(getHistory())
        }
    }, [tab, dispatch])

    useEffect(() => {
        if (tab === TAB_HISTORY_USER) {
            if (paymentSuccess === FETCH_DATA_SUCCESS) {
                notifyPaymentSuccess()
                dispatch(clearPaymentSuccess())
            }
        }
    }, [paymentSuccess, dispatch, tab])

    useEffect(() => {
        if (infoPayment.link?.length > 0) {
            window.open(infoPayment.link)
            dispatch(paymentReset())
            dispatch(resetSeats())
            window.location.reload();
        }
    }, [dispatch, infoPayment.link])

    const handleClickRepayment = (item) => {
        dispatch(rePayment(item))
    }

    return (
        <Container style={{ display: tab === TAB_HISTORY_USER ? 'block' : 'none' }}>
            <F.TabItem theme={theme}>
                <Row className="justify-content-center">
                    <Col xs={12} lg={10}>
                        <Table dark>
                            <thead>
                                <tr>
                                    <th>{AUTHORS.history.title_table_no}</th>
                                    <th>{AUTHORS.history.title_table_name}</th>
                                    <th >{AUTHORS.history.title_table_status}</th>
                                    <th>{AUTHORS.history.title_table_price}</th>
                                    <th >{AUTHORS.history.title_table_date_start}</th>
                                    <th>{AUTHORS.history.title_table_method}</th>
                                    <th>{AUTHORS.history.title_table_action}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.length > 0 ? history.map((item, index) => {
                                    const { namemovie, status, price, date, paid, theater, hour, seat } = item
                                    return (<>
                                        <tr key={index} className="item__history">
                                            <th data-label={AUTHORS.history.title_table_no} scope="row">{index + 1}</th>
                                            <td data-label={AUTHORS.history.title_table_name}>{namemovie}</td>
                                            <td data-label={AUTHORS.history.title_table_status}>{(status && AUTHORS.history.status_pending) || AUTHORS.history.status_exit}</td>
                                            <td data-label={AUTHORS.history.title_table_price}>{price}</td>
                                            <td data-label={AUTHORS.history.title_table_date_start}>{new Date(date).toLocaleDateString()}</td>
                                            <td data-label={AUTHORS.history.title_table_method}>{(paid && AUTHORS.history.paid_succeed) || AUTHORS.history.paid_exit}</td>
                                            <td className='select'>
                                                {(status && paid) || status === false
                                                    ? <button theme={theme}>{AUTHORS.history.btn_delete}</button>
                                                    : <button theme={theme} onClick={() => handleClickRepayment(item)}>{AUTHORS.history.btn_payment}</button>
                                                }
                                            </td>
                                            <td className='item__history--detail'>
                                                <h4>{namemovie}</h4>
                                                <div>{AUTHORS.history.detail_theater}{theater}</div>
                                                <div>{AUTHORS.history.detail_date}{new Date(date).toLocaleDateString()}</div>
                                                <div>{AUTHORS.history.detail_hour}{hour}</div>
                                                <div>{AUTHORS.history.detail_seat}
                                                    {seat.length && seat.map((item) => <span className='seat'> {item}, </span>)}
                                                </div>
                                            </td>
                                        </tr>
                                    </>)
                                }) : AUTHORS.history.empty_history}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </F.TabItem >
        </Container >
    );
}

export default History;
