export const DEFECT_TYPES = [
    {
        id: 'corrugation',
        name: 'Rail Corrugation',
        description: 'Wavy irregularities on the rail head caused by friction and wear.',
        severityRange: [40, 70],
        color: '#f59e0b', // Amber/Orange
        code: 'TYPE_C_01'
    },
    {
        id: 'spalling',
        name: 'Surface Spalling',
        description: 'Flaking of rail surface material due to rolling contact fatigue.',
        severityRange: [60, 90],
        color: '#ef4444', // Red
        code: 'TYPE_S_05'
    },
    {
        id: 'squat',
        name: 'Squat Defect',
        description: 'Depression in rail head surface leading to severe structural cracks.',
        severityRange: [75, 99],
        color: '#b91c1c', // Dark Red
        code: 'TYPE_SQ_09'
    },
    {
        id: 'shelling',
        name: 'Gauge Corner Shelling',
        description: 'Progressive breakdown of gauge corner surface.',
        severityRange: [50, 85],
        color: '#f97316', // Orange
        code: 'TYPE_SH_03'
    },
    {
        id: 'burn',
        name: 'Wheel Burn',
        description: 'Thermal damage caused by wheel slippage.',
        severityRange: [30, 60],
        color: '#eab308', // Yellow
        code: 'TYPE_WB_02'
    }
];

export const getRandomDefect = () => {
    const defect = DEFECT_TYPES[Math.floor(Math.random() * DEFECT_TYPES.length)];
    const minSev = defect.severityRange[0];
    const maxSev = defect.severityRange[1];
    const intensity = Math.floor(Math.random() * (maxSev - minSev + 1)) + minSev;

    let alertLevel = 'Low';
    if (intensity > 50) alertLevel = 'Medium';
    if (intensity > 80) alertLevel = 'Critical';

    return {
        ...defect,
        intensity,
        alertLevel
    };
};
