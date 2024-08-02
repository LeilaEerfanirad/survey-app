const qs = [
    {
        id: 1,
        title: "سوال 1",
        final_destination: 2,
        choices: [
            { id: 1 },
            { id: 2 },
            { id: 3 },
        ],
        edges: [
            {
                destination: 3,
                conditions: [
                    { boolean_operator: 2, logical_operator: 1, first_operand: 1, second_operand: 1 }, // or
                    { boolean_operator: 2, logical_operator: 1, first_operand: 1, second_operand: 3 }  // or
                ]
            },
            {
                destination: 4,
                conditions: [
                    { boolean_operator: 1, logical_operator: 1, first_operand: 1, second_operand: 2 }  // and
                ]
            }
        ]
    },
    {
        id: 2,
        title: "سوال2",
        final_destination: 3,
        edges: []
    },
    {
        id: 3,
        title: "سوال3",
        final_destination: 4,
        edges: []
    },
    {
        id: 4,
        title: "سوال4",
        edges: []
    }
];

const answers = {
    1: [1],
    2: [],
    3: [],
    4: []
};

function checkCondition(first_operand, second_operand) {
    let userAnswers = answers[first_operand];
    return userAnswers.includes(second_operand);
}

function checkEdges(edges) {
    for (const edge of edges) {
        const { destination, conditions } = edge;
        let isTrueEdge = (conditions.length > 0) ? (conditions[0].boolean_operator === 1 ? true : false) : true;

        for (const condition of conditions) {
            const { boolean_operator, logical_operator, first_operand, second_operand } = condition;
            const isConditionMet = logical_operator === 1
                ? checkCondition(first_operand, second_operand)
                : !checkCondition(first_operand, second_operand);

            if (boolean_operator === 1) { // 'and' operator
                isTrueEdge = isTrueEdge && isConditionMet;
            } else if (boolean_operator === 2) { // 'or' operator
                isTrueEdge = isTrueEdge || isConditionMet;
            }
        }

        if (isTrueEdge) {
            return { isTrueEdge, destination };
        }
    }

    return { isTrueEdge: false };
}

function getNextQuestion(currentQuestionId, answers) {
    const currentQuestion = qs.find(q => q.id === currentQuestionId);
    if (!currentQuestion) {
        throw new Error(`Question with id ${currentQuestionId} not found`);
    }

    const { edges, final_destination } = currentQuestion;
    const edgeResult = checkEdges(edges);

    if (edgeResult.isTrueEdge) {
        return edgeResult.destination;
    } else {
        return final_destination;
    }
}

// Example usage:
const currentQuestionId = 1;
const nextQuestionId = getNextQuestion(currentQuestionId, answers);
console.log(`Next question ID: ${nextQuestionId}`);
