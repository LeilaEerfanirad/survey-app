import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Table } from 'antd';
import { useParams } from 'react-router-dom';
import getQuestionApi from '../../../Apis/questions/getQuestionApi';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);
export default function ReportPage() {

    const { questionId } = useParams()

    const [question, setQuestion] = useState()



    useEffect(() => {
        getQuestionApi(questionId)
            .then(res => {
                console.log(res);
                setQuestion(res)
                // formik.setValues(res)

            }).catch(e => {
                console.log(e);

            })


    }, [questionId])


    return (
        <div className='h-full overflow-auto'>
            <div className='border p-4'>
                <p>
                    سوال: {question?.title}
                </p>
                <QuestionReport question={question} />


            </div>


            {/* <h2>Pie Chart Example</h2> */}

        </div>
    )
}

function QuestionReport({ question }) {

    const choiceCounts = {};

    question?.answers.forEach(answerId => {
        choiceCounts[answerId] = (choiceCounts[answerId] || 0) + 1;
    });

    const columns = [
        {
            title: "شماره",
            dataIndex: "index",
            key: "index",

            render: (text) => <p>{text}</p>,
        },
        {
            title: "پاسخ ها",
            dataIndex: "key",
            key: "key",

            render: (text) => <p>{text}</p>,
        },
    ]

    const data = {
        labels: question?.choices?.map(item => item.name),
        datasets: [
            {
                label: 'Sample Pie Chart',
                data: question?.choices?.map(item => choiceCounts[item._id]),
                backgroundColor: [
                    '#0088FE',
                    '#00C49F',
                    '#FFBB28',
                    '#FF8042'
                ],
                borderColor: [
                    '#ffffff'
                ],
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    }
                }
            }
        }
    };

    switch (question?.type) {
        case 2:

            return (
                <div className='mt-2'>
                    <Table pagination={{
                        style: { direction: "ltr", fontFamily: "PelakB" },
                    }} columns={columns} dataSource={question.answers.map((item, index) => ({
                        key: item,
                        index: index + 1

                    }))}>

                    </Table>

                </div>
            )

        case 3:

            return (
                <div className='grid grid-cols-12'>
                    <div className='col-span-6'></div>
                    <div className='col-span-6 flex justify-center items-center'>
                        <div className='w-full h-full'>
                            <Pie data={data} options={options} />
                        </div>
                    </div>
                </div>
            )


        default:
            break;
    }

}
