import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    Card,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Table,
    Row
} from 'reactstrap';

const RateCurrency = () => {

    const [data, setData] = useState([]);
    const [currency, setCurrency] = useState(0);
    const [result, setResult] = useState(0);
    const [usd, setUsd] = useState(1);
    const [buyPercentage, setBuyPercentage] = useState(0);
    const [sellPercentage, setSellPercentage] = useState(0);

    const fetchData = () => {
        axios
            .get("http://api.currencylayer.com/live?access_key=21c01a57d90c8967e6f72065bb32dad2")
            .then((res) => setData(res.data.quotes));
    }
    const handleSelectCurrency = (e) => {
        setCurrency(e.target.value);
        setResult(e.target.value * usd);
    }
    const handleChangeUsd = (e) => {
        setUsd(e.target.value);
        setResult(e.target.value * currency);
    }
    const handleChangeCurrency = (e) => {
        setResult(e.target.value);
        setUsd(e.target.value / currency);
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (

        <div>
            <Card>
                <Row>
                    <Col className="text-left">
                        <h1 className="mb-5"> USD Currency Rate</h1>
                        <h1 className="mb-5"> {data.length}</h1>
                    </Col>
                    <Col className="text-right">
                        <Button color="primary" onClick={fetchData}>Refresh Data</Button></Col>
                </Row>
                <Form>
                    <FormGroup row className="mb-3">
                        <Col xs={5}>
                            <Input type="number" name="amount" placeholder="0" value={usd} onChange={handleChangeUsd} />
                        </Col>
                        <Col xs={2}>
                            =
                        </Col>
                        <Col xs={5}>
                            <Input type="number" name="amount" placeholder="0" value={result} onChange={handleChangeCurrency} />
                        </Col>
                    </FormGroup>
                    <FormGroup row className="mb-3">
                        <Col xs={5}>
                            <Input type="select" name="currency" disabled>
                                <option>USD</option>
                            </Input>
                        </Col>
                        <Col xs={2}></Col>
                        <Col xs={5}>
                            <Input type="select" name="currency" value={currency} onChange={handleSelectCurrency}>
                                <option>Please select currency</option>
                                {Object.keys(data).map((key) => {
                                    return (
                                        <option key={key} value={data[key]}>{key.slice(3, 6)}</option>
                                    )
                                })}
                            </Input>
                        </Col>
                    </FormGroup>
                </Form>
            </Card>
            <Card>
                <Form>
                    <FormGroup row className="mb-3">
                        <Col xs={5}>
                            <Label>Buy Percentage</Label>
                            <Input type="number" name="buyPercentage" placeholder="0" min="0" value={buyPercentage} onChange={(e) => setBuyPercentage(e.target.value)} />
                        </Col>
                        <Col xs={2}></Col>
                        <Col xs={5}>
                            <Label>Sell Percentage</Label>
                            <Input type="number" name="sellPercentage" placeholder="0" min="0" value={sellPercentage} onChange={(e) => setSellPercentage(e.target.value)} />
                        </Col>
                    </FormGroup>
                </Form>
                <Table>
                    <thead>
                        <tr>
                            <th>Currency</th>
                            <th>Rate</th>
                            <th>Buy Rate</th>
                            <th>Sell Rate</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            Object.keys(data).map((key) => {
                                const buyRate = data[key] + ((buyPercentage / 100) * data[key]);
                                const sellRate = data[key] - ((sellPercentage / 100) * data[key]);
                                return (

                                    <tr key={key}>
                                        <td className="font-weight-bold">{key.slice(3, 6)}</td>
                                        <td>{data[key]}</td>
                                        <td>{buyRate}</td>
                                        <td>{sellRate}</td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </Table>
            </Card>
        </div >
    )
}
export default RateCurrency;
