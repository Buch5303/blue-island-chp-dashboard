import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, ScatterChart, Scatter,
  XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell, Sector, ReferenceLine, Label
} from 'recharts';

// Define corporate color palette
const COLORS = {
  BLUE: '#1B67B2',
  GREEN: '#568C1C',
  RED: '#B54369',
  ORANGE: '#C77F1A', 
  PURPLE: '#4D44AB',
  BLACK: '#202020',
  LIGHT_BLUE: '#89CFF0',
  LIGHT_GREEN: '#90EE90',
  LIGHT_RED: '#FFB6C1',
  LIGHT_ORANGE: '#FFDAB9',
  GREY: '#D3D3D3'
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const percentFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const BlueIslandDashboard = () => {
  // State for interactive elements
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [completionDate, setCompletionDate] = useState("May 2026");
  const [successRate, setSuccessRate] = useState(85);
  const [turbineStrategy, setTurbineStrategy] = useState("secondary");
  const [selectedFinancialMetric, setSelectedFinancialMetric] = useState("npv");
  
  // Dummy data for financial metrics
  const financialData = {
    npv: 76.5,  // in millions
    irr: 0.154,
    paybackPeriod: 6.2,
    lcoe: 64.5,  // $/MWh
    // More metrics can be added here
  };
  
  // Calculate ROI
  const roi = (financialData.npv / 112.4) * 100;
  
  // Dummy data for cash flow
  const cashFlowData = [
    { year: 0, cashFlow: -112.4, cumulative: -112.4 },
    { year: 1, cashFlow: 14.2, cumulative: -98.2 },
    { year: 2, cashFlow: 16.3, cumulative: -81.9 },
    { year: 3, cashFlow: 17.5, cumulative: -64.4 },
    { year: 4, cashFlow: 18.2, cumulative: -46.2 },
    { year: 5, cashFlow: 19.1, cumulative: -27.1 },
    { year: 6, cashFlow: 19.4, cumulative: -7.7 },
    { year: 7, cashFlow: 20.2, cumulative: 12.5 },
    { year: 8, cashFlow: 20.8, cumulative: 33.3 },
    { year: 9, cashFlow: 21.3, cumulative: 54.6 },
    { year: 10, cashFlow: 21.9, cumulative: 76.5 },
  ];
  
  // Data for project timeline
  const timelineData = [
    { name: 'Equipment Acquisition', startDay: 0, duration: 90, category: 'Critical' },
    { name: 'Permitting', startDay: 0, duration: 120, category: 'Critical' },
    { name: 'Site Preparation', startDay: 30, duration: 60, category: 'Standard' },
    { name: 'Foundation Construction', startDay: 60, duration: 75, category: 'Standard' },
    { name: 'Equipment Installation', startDay: 120, duration: 120, category: 'Critical' },
    { name: 'Pipeline Construction', startDay: 90, duration: 90, category: 'Standard' },
    { name: 'Electrical Installation', startDay: 150, duration: 90, category: 'Standard' },
    { name: 'Control Systems', startDay: 180, duration: 60, category: 'Standard' },
    { name: 'Commissioning', startDay: 240, duration: 60, category: 'Critical' },
    { name: 'Testing', startDay: 270, duration: 45, category: 'Critical' },
    { name: 'Final Completion', startDay: 315, duration: 30, category: 'Critical' },
  ];
  
  // Milestone data
  const milestoneData = [
    { name: 'Turbine Purchase', day: 14, success: 0.85 },
    { name: 'HRSG Order', day: 21, success: 0.90 },
    { name: 'Key Permits Secured', day: 90, success: 0.85 },
    { name: 'Turbine Delivery', day: 120, success: 0.80 },
    { name: 'Major Installation Complete', day: 240, success: 0.85 },
    { name: 'Commissioning Start', day: 300, success: 0.90 },
    { name: 'Commercial Operation', day: 396, success: 0.85 },
  ];
  
  // Risk matrix data
  const riskData = [
    { name: 'Turbine Condition', probability: 0.25, impact: 0.7, category: 'equipment' },
    { name: 'Shipping Delays', probability: 0.40, impact: 0.5, category: 'equipment' },
    { name: 'Compatibility Issues', probability: 0.20, impact: 0.6, category: 'equipment' },
    { name: 'Permitting Delays', probability: 0.35, impact: 0.8, category: 'schedule' },
    { name: 'Weather Delays', probability: 0.30, impact: 0.4, category: 'schedule' },
    { name: 'Labor Shortages', probability: 0.25, impact: 0.6, category: 'schedule' },
    { name: 'Cost Overruns', probability: 0.40, impact: 0.7, category: 'financial' },
    { name: 'Interest Rate Changes', probability: 0.30, impact: 0.5, category: 'financial' },
    { name: 'Fuel Supply Disruption', probability: 0.20, impact: 0.8, category: 'operational' },
    { name: 'Grid Connection Issues', probability: 0.15, impact: 0.9, category: 'operational' },
    { name: 'Electricity Price Volatility', probability: 0.45, impact: 0.7, category: 'market' },
    { name: 'Thermal Demand Changes', probability: 0.30, impact: 0.6, category: 'market' },
  ];
  
  // Sensitivity analysis data
  const sensitivityData = {
    electricity: [
      { change: -30, npv: -22.4, irr: -28.6 },
      { change: -20, npv: -14.8, irr: -18.8 },
      { change: -10, npv: -7.3, irr: -9.2 },
      { change: 0, npv: 0, irr: 0 },
      { change: 10, npv: 7.2, irr: 9.3 },
      { change: 20, npv: 14.5, irr: 18.7 },
      { change: 30, npv: 21.6, irr: 28.1 },
    ],
    fuel: [
      { change: -20, npv: 16.2, irr: 13.5 },
      { change: -10, npv: 8.1, irr: 6.7 },
      { change: 0, npv: 0, irr: 0 },
      { change: 10, npv: -8.2, irr: -6.8 },
      { change: 20, npv: -16.3, irr: -13.5 },
      { change: 30, npv: -24.5, irr: -20.4 },
      { change: 50, npv: -41.2, irr: -34.6 },
    ],
    capex: [
      { change: -10, npv: 13.5, irr: 18.6 },
      { change: -5, npv: 6.7, irr: 9.1 },
      { change: 0, npv: 0, irr: 0 },
      { change: 5, npv: -6.8, irr: -8.8 },
      { change: 10, npv: -13.6, irr: -17.5 },
      { change: 20, npv: -27.4, irr: -34.2 },
    ],
    availability: [
      { change: -10, npv: -21.5, irr: -17.8 },
      { change: -5, npv: -10.7, irr: -8.9 },
      { change: 0, npv: 0, irr: 0 },
      { change: 5, npv: 10.6, irr: 8.8 },
    ],
  };
  
  // Monte Carlo simulation results
  const monteCarloData = {
    npv: {
      mean: 76.5,
      median: 74.8,
      p10: 45.2,
      p90: 108.7,
      distribution: [
        { range: "< 0", count: 12 },
        { range: "0-25", count: 45 },
        { range: "25-50", count: 98 },
        { range: "50-75", count: 175 },
        { range: "75-100", count: 142 },
        { range: "100-125", count: 86 },
        { range: "> 125", count: 42 },
      ]
    },
    irr: {
      mean: 0.154,
      median: 0.151,
      p10: 0.112,
      p90: 0.198,
      distribution: [
        { range: "< 8%", count: 18 },
        { range: "8%-10%", count: 42 },
        { range: "10%-12%", count: 87 },
        { range: "12%-15%", count: 145 },
        { range: "15%-18%", count: 126 },
        { range: "18%-20%", count: 62 },
        { range: "> 20%", count: 20 },
      ]
    },
    completion: {
      mean: "Jun 2026",
      p10: "May 2026",
      p90: "Oct 2026",
      distribution: [
        { range: "Apr 2026", count: 15 },
        { range: "May 2026", count: 132 },
        { range: "Jun 2026", count: 185 },
        { range: "Jul 2026", count: 95 },
        { range: "Aug 2026", count: 42 },
        { range: "Sep 2026", count: 21 },
        { range: "Oct 2026", count: 10 },
      ]
    },
    success: {
      mean: 0.82,
      p10: 0.67,
      p90: 0.94,
      distribution: [
        { range: "< 60%", count: 25 },
        { range: "60%-70%", count: 78 },
        { range: "70%-80%", count: 145 },
        { range: "80%-90%", count: 185 },
        { range: "90%-95%", count: 52 },
        { range: "95%-99%", count: 15 },
      ]
    }
  };
  
  // Turbine acquisition data
  const turbineData = {
    secondary: {
      cost: 3.5,
      refurbishment: 0.9,
      totalCost: 4.4,
      delivery: 90,
      risk: 0.25,
      impact: 5
    },
    new: {
      cost: 6.25,
      refurbishment: 0,
      totalCost: 6.25,
      delivery: 270,
      risk: 0.05,
      impact: 2
    },
    hybrid: {
      cost: 4.8,
      refurbishment: 0.6,
      totalCost: 5.4,
      delivery: 180,
      risk: 0.15,
      impact: 3
    }
  };
  
  // Capital structure data for pie chart
  const capitalStructureData = [
    { name: 'Turbines', value: 17.6, color: COLORS.BLUE },
    { name: 'HRSG', value: 17.2, color: COLORS.GREEN },
    { name: 'Steam Turbine', value: 11.3, color: COLORS.ORANGE },
    { name: 'BOP Equipment', value: 20.3, color: COLORS.PURPLE },
    { name: 'Electrical', value: 6.5, color: COLORS.RED },
    { name: 'Site Development', value: 4.2, color: COLORS.LIGHT_BLUE },
    { name: 'Engineering', value: 5.5, color: COLORS.LIGHT_GREEN },
    { name: 'Project Management', value: 3.8, color: COLORS.LIGHT_ORANGE },
    { name: 'Permitting', value: 1.8, color: COLORS.LIGHT_RED },
    { name: 'Contingency', value: 7.2, color: COLORS.GREY },
  ];
  
  // Revenue breakdown data
  const revenueData = [
    { name: 'Electricity', value: 57.5, color: COLORS.BLUE },
    { name: 'Capacity', value: 4.5, color: COLORS.PURPLE },
    { name: 'Thermal Energy', value: 37.2, color: COLORS.RED },
    { name: 'Ancillary Services', value: 0.8, color: COLORS.GREEN },
  ];
  
  // Operating expense breakdown
  const opexData = [
    { name: 'Fixed O&M', value: 1.8, color: COLORS.BLUE },
    { name: 'Variable O&M', value: 3.4, color: COLORS.GREEN },
    { name: 'Fuel', value: 9.8, color: COLORS.RED },
    { name: 'Water & Chemicals', value: 0.5, color: COLORS.ORANGE },
    { name: 'Admin & Insurance', value: 1.7, color: COLORS.PURPLE },
    { name: 'Property Tax', value: 1.2, color: COLORS.LIGHT_BLUE },
    { name: 'Emissions', value: 0.4, color: COLORS.LIGHT_RED },
  ];
  
  // Tabs configuration
  const tabs = [
    { name: "Overview", icon: "📊" },
    { name: "Timeline", icon: "📅" },
    { name: "Financials", icon: "💰" },
    { name: "Risk Analysis", icon: "⚠️" },
    { name: "Sensitivities", icon: "🔄" },
    { name: "Monte Carlo", icon: "🎲" },
  ];
  
  // Success gauge component
  const SuccessGauge = ({ successRate }) => {
    const gaugeValue = successRate / 100;
    const startAngle = 180;
    const endAngle = 0;
    const radius = 80;
    
    const data = [{ value: 1 }];
    
    // Colors based on success percentage
    let fillColor;
    if (successRate >= 75) fillColor = COLORS.GREEN;
    else if (successRate >= 50) fillColor = COLORS.BLUE;
    else if (successRate >= 25) fillColor = COLORS.ORANGE;
    else fillColor = COLORS.RED;
    
    // Create the needle
    const cx = 100;
    const cy = 100;
    const angle = startAngle - (gaugeValue * (startAngle - endAngle));
    const angleRad = (angle * Math.PI) / 180;
    const needleLength = radius * 0.8;
    const needleRadius = 4;
    const needleX = cx + needleLength * Math.cos(angleRad);
    const needleY = cy - needleLength * Math.sin(angleRad);
    
    return (
      <div className="relative w-full flex flex-col items-center">
        <svg width="200" height="120" viewBox="0 0 200 120">
          <g transform="translate(100, 100)">
            {/* Gauge background */}
            <path
              d="M-80,0 A80,80 0 0,1 80,0"
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="20"
            />
            
            {/* Colored sections */}
            <path
              d="M-80,0 A80,80 0 0,1 -40,0"
              fill="none"
              stroke={COLORS.RED}
              strokeWidth="20"
            />
            <path
              d="M-40,0 A80,80 0 0,1 0,0"
              fill="none"
              stroke={COLORS.ORANGE}
              strokeWidth="20"
            />
            <path
              d="M0,0 A80,80 0 0,1 40,0"
              fill="none"
              stroke={COLORS.BLUE}
              strokeWidth="20"
            />
            <path
              d="M40,0 A80,80 0 0,1 80,0"
              fill="none"
              stroke={COLORS.GREEN}
              strokeWidth="20"
            />
            
            {/* Ticks */}
            <text x="-80" y="20" textAnchor="middle" fontSize="12">0%</text>
            <text x="-40" y="20" textAnchor="middle" fontSize="12">25%</text>
            <text x="0" y="20" textAnchor="middle" fontSize="12">50%</text>
            <text x="40" y="20" textAnchor="middle" fontSize="12">75%</text>
            <text x="80" y="20" textAnchor="middle" fontSize="12">100%</text>
            
            {/* Needle */}
            <line
              x1="0"
              y1="0"
              x2={needleLength * Math.cos(angleRad)}
              y2={-needleLength * Math.sin(angleRad)}
              stroke="black"
              strokeWidth="2"
            />
            <circle cx="0" cy="0" r="5" fill="black" />
          </g>
        </svg>
        <div className="text-center font-bold text-2xl mt-3" style={{ color: fillColor }}>
          {successRate}%
        </div>
        <div className="text-center text-gray-500 font-medium">
          Success Likelihood
        </div>
      </div>
    );
  };
  
  // Project timeline chart
  const TimelineChart = ({ data, milestones }) => {
    const COLORS_BY_CATEGORY = {
      'Critical': COLORS.RED,
      'Standard': COLORS.BLUE,
    };
    
    // Process data to add end dates
    const processedData = data.map(item => ({
      ...item,
      endDay: item.startDay + item.duration
    }));
    
    return (
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={processedData}
            margin={{ top: 20, right: 30, left: 120, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number"
              domain={[0, 'dataMax + 30']}
              label={{ value: 'Days from Project Start', position: 'bottom', offset: 0 }}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={120}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value, name, props) => {
                if (name === "startDay") return [`Start: Day ${value}`, "Start"];
                if (name === "duration") return [`Duration: ${value} days`, "Duration"];
                return [value, name];
              }}
              labelFormatter={(value) => `${value}`}
            />
            <Legend />
            <ReferenceLine 
              x={396} // Target completion day
              stroke="red" 
              strokeDasharray="3 3"
              label={{ value: "Target: May 2026", position: "top", fill: "red" }}
            />
            
            {/* Task Bars */}
            <Bar 
              dataKey="duration" 
              stackId="a" 
              barSize={20}
            >
              {processedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={COLORS_BY_CATEGORY[entry.category]} 
                />
              ))}
            </Bar>
            
            {/* Milestones */}
            {milestones.map((milestone, index) => (
              <ReferenceLine
                key={`milestone-${index}`}
                x={milestone.day}
                stroke={COLORS.PURPLE}
                strokeWidth={2}
                label={{ 
                  value: milestone.name,
                  position: "top",
                  fill: COLORS.PURPLE,
                  fontSize: 10,
                  angle: -45,
                  textAnchor: "end",
                  offset: 10
                }}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  // Financial metric cards
  const FinancialMetricCard = ({ title, value, format, description }) => {
    let formattedValue;
    if (format === "currency") {
      formattedValue = currencyFormatter.format(value) + "M";
    } else if (format === "percent") {
      formattedValue = percentFormatter.format(value);
    } else if (format === "years") {
      formattedValue = value.toFixed(1) + " years";
    } else if (format === "lcoe") {
      formattedValue = "$" + value.toFixed(2) + "/MWh";
    } else {
      formattedValue = value.toString();
    }
    
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <div className="text-gray-500 text-sm">{title}</div>
        <div className="text-2xl font-bold">{formattedValue}</div>
        <div className="text-gray-500 text-xs mt-1">{description}</div>
      </div>
    );
  };
  
  // Cash flow chart
  const CashFlowChart = ({ data }) => {
    return (
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip formatter={(value) => currencyFormatter.format(value) + "M"} />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="cashFlow"
              fill={COLORS.BLUE}
              name="Annual Cash Flow"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="cumulative"
              stroke={COLORS.GREEN}
              name="Cumulative Cash Flow"
              strokeWidth={2}
            />
            <ReferenceLine y={0} stroke="#000" yAxisId="left" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  // Risk matrix chart
  const RiskMatrix = ({ data }) => {
    const RISK_COLORS = {
      'equipment': COLORS.BLUE,
      'schedule': COLORS.GREEN,
      'financial': COLORS.RED,
      'operational': COLORS.ORANGE,
      'market': COLORS.PURPLE,
    };
    
    return (
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid />
            <XAxis 
              type="number" 
              dataKey="probability" 
              name="Probability" 
              domain={[0, 1]}
              label={{ value: 'Probability', position: 'bottom' }}
            />
            <YAxis 
              type="number" 
              dataKey="impact" 
              name="Impact" 
              domain={[0, 1]}
              label={{ value: 'Impact', angle: -90, position: 'left' }}
            />
            <ZAxis range={[60, 400]} />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              formatter={(value, name) => [value.toFixed(2), name]}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 border rounded shadow">
                      <p className="font-bold">{data.name}</p>
                      <p>Probability: {data.probability.toFixed(2)}</p>
                      <p>Impact: {data.impact.toFixed(2)}</p>
                      <p>Category: {data.category}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            
            {/* Quadrant reference lines */}
            <ReferenceLine x={0.5} stroke="rgba(0,0,0,0.3)" strokeDasharray="3 3" />
            <ReferenceLine y={0.5} stroke="rgba(0,0,0,0.3)" strokeDasharray="3 3" />
            
            {/* Risk labels */}
            <text x="25%" y="25%" textAnchor="middle" fill="#666" fontSize={12}>
              Low Risk
            </text>
            <text x="75%" y="25%" textAnchor="middle" fill="#666" fontSize={12}>
              Medium Risk
            </text>
            <text x="25%" y="75%" textAnchor="middle" fill="#666" fontSize={12}>
              Medium Risk
            </text>
            <text x="75%" y="75%" textAnchor="middle" fill={COLORS.RED} fontWeight="bold" fontSize={12}>
              High Risk
            </text>
            
            {/* Create a scatter series for each category */}
            {Object.keys(RISK_COLORS).map(category => (
              <Scatter
                key={category}
                name={category.charAt(0).toUpperCase() + category.slice(1)}
                data={data.filter(item => item.category === category)}
                fill={RISK_COLORS[category]}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  // Sensitivity chart
  const SensitivityChart = ({ data, selectedMetric }) => {
    const metrics = {
      'npv': 'NPV Change (%)',
      'irr': 'IRR Change (%)'
    };
    
    const formattedData = {
      electricity: data.electricity.map(item => ({
        ...item,
        parameter: 'Electricity Price'
      })),
      fuel: data.fuel.map(item => ({
        ...item,
        parameter: 'Fuel Cost'
      })),
      capex: data.capex.map(item => ({
        ...item,
        parameter: 'Capital Cost'
      })),
      availability: data.availability.map(item => ({
        ...item,
        parameter: 'Availability'
      }))
    };
    
    // Combine all data
    const combinedData = [
      ...formattedData.electricity,
      ...formattedData.fuel,
      ...formattedData.capex,
      ...formattedData.availability
    ];
    
    return (
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            margin={{ top: 20, right: 30, left: 30, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              dataKey="change" 
              domain={[-30, 50]}
              label={{ value: 'Parameter Change (%)', position: 'bottom' }}
            />
            <YAxis 
              domain={[-45, 30]}
              label={{ value: metrics[selectedMetric], angle: -90, position: 'left' }}
            />
            <Tooltip 
              formatter={(value, name) => [`${value.toFixed(1)}%`, name]}
              labelFormatter={(value) => `Change: ${value}%`}
            />
            <Legend />
            <ReferenceLine x={0} stroke="#000" />
            <ReferenceLine y={0} stroke="#000" />
            
            <Line
              data={formattedData.electricity}
              type="monotone"
              dataKey={selectedMetric}
              name="Electricity Price"
              stroke={COLORS.GREEN}
              dot={{ stroke: COLORS.GREEN, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
              strokeWidth={2}
            />
            <Line
              data={formattedData.fuel}
              type="monotone"
              dataKey={selectedMetric}
              name="Fuel Cost"
              stroke={COLORS.RED}
              dot={{ stroke: COLORS.RED, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
              strokeWidth={2}
            />
            <Line
              data={formattedData.capex}
              type="monotone"
              dataKey={selectedMetric}
              name="Capital Cost"
              stroke={COLORS.BLUE}
              dot={{ stroke: COLORS.BLUE, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
              strokeWidth={2}
            />
            <Line
              data={formattedData.availability}
              type="monotone"
              dataKey={selectedMetric}
              name="Availability"
              stroke={COLORS.ORANGE}
              dot={{ stroke: COLORS.ORANGE, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  // Monte Carlo distribution chart
  const MonteCarloChart = ({ data, parameter }) => {
    let chartData, title, formatter;
    
    if (parameter === 'npv') {
      chartData = data.npv.distribution;
      title = 'NPV Distribution ($ Million)';
      formatter = (value) => value;
    } else if (parameter === 'irr') {
      chartData = data.irr.distribution;
      title = 'IRR Distribution';
      formatter = (value) => value;
    } else if (parameter === 'completion') {
      chartData = data.completion.distribution;
      title = 'Completion Date Distribution';
      formatter = (value) => value;
    } else if (parameter === 'success') {
      chartData = data.success.distribution;
      title = 'Success Likelihood Distribution';
      formatter = (value) => value;
    }
    
    return (
      <div className="w-full h-64">
        <h3 className="text-center font-semibold">{title}</h3>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 30, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip formatter={(value) => [value, 'Frequency']} />
            <Bar dataKey="count" fill={COLORS.BLUE} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  // Monte Carlo summary metrics
  const MonteCarloSummary = ({ data, parameter }) => {
    let summary, title, format;
    
    if (parameter === 'npv') {
      summary = data.npv;
      title = 'NPV Summary ($ Million)';
      format = 'currency';
    } else if (parameter === 'irr') {
      summary = data.irr;
      title = 'IRR Summary';
      format = 'percent';
    } else if (parameter === 'completion') {
      summary = data.completion;
      title = 'Completion Date Summary';
      format = 'date';
    } else if (parameter === 'success') {
      summary = data.success;
      title = 'Success Likelihood Summary';
      format = 'percent';
    }
    
    const formatValue = (value, format) => {
      if (format === 'currency') {
        return currencyFormatter.format(value) + 'M';
      } else if (format === 'percent') {
        return percentFormatter.format(value);
      } else {
        return value;
      }
    };
    
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-center font-semibold mb-3">{title}</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center">
            <div className="text-gray-500 text-sm">Mean</div>
            <div className="text-lg font-bold">{formatValue(summary.mean, format)}</div>
          </div>
          {summary.median && (
            <div className="text-center">
              <div className="text-gray-500 text-sm">Median</div>
              <div className="text-lg font-bold">{formatValue(summary.median, format)}</div>
            </div>
          )}
          <div className="text-center">
            <div className="text-gray-500 text-sm">P10</div>
            <div className="text-lg font-bold">{formatValue(summary.p10, format)}</div>
          </div>
          <div className="text-center">
            <div className="text-gray-500 text-sm">P90</div>
            <div className="text-lg font-bold">{formatValue(summary.p90, format)}</div>
          </div>
        </div>
      </div>
    );
  };
  
  // Revenue & OPEX breakdown pie charts
  const BreakdownChart = ({ data, title }) => {
    return (
      <div className="w-full h-64">
        <h3 className="text-center font-semibold">{title}</h3>
        <ResponsiveContainer width="100%" height="85%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              dataKey="value"
              nameKey="name"
              label={(entry) => `${entry.name}: ${entry.value}%`}
              labelLine={true}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `${value}%`}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  // Tab switcher component
  const TabSwitcher = ({ tabs, activeTabIndex, setActiveTabIndex }) => {
    return (
      <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden shadow mb-6">
        {tabs.map((tab, index) => (
          <button
            key={tab.name}
            onClick={() => setActiveTabIndex(index)}
            className={`flex items-center px-4 py-3 text-sm font-medium ${
              index === activeTabIndex
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </div>
    );
  };
  
  // Project overview tab content
  const ProjectOverview = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 col-span-2">
          <h2 className="text-xl font-bold mb-4 text-blue-800">Blue Island CHP Project</h2>
          <div className="grid grid-cols-2 gap-x-10 gap-y-4 mb-4">
            <div>
              <div className="text-gray-500 text-sm">Capacity</div>
              <div className="font-medium">30 MW</div>
            </div>
            <div>
              <div className="text-gray-500 text-sm">Technology</div>
              <div className="font-medium">Combined Heat & Power</div>
            </div>
            <div>
              <div className="text-gray-500 text-sm">Target Completion</div>
              <div className="font-medium">{completionDate}</div>
            </div>
            <div>
              <div className="text-gray-500 text-sm">Turbine Type</div>
              <div className="font-medium">Solar Taurus 70 (x4)</div>
            </div>
            <div>
              <div className="text-gray-500 text-sm">Heat Recovery</div>
              <div className="font-medium">250 MMBtu/hr</div>
            </div>
            <div>
              <div className="text-gray-500 text-sm">Expected Efficiency</div>
              <div className="font-medium">82%</div>
            </div>
            <div>
              <div className="text-gray-500 text-sm">Capital Cost</div>
              <div className="font-medium">$112.4 Million</div>
            </div>
            <div>
              <div className="text-gray-500 text-sm">Project Owner</div>
              <div className="font-medium">Tower Group Holdings</div>
            </div>
          </div>
          
          <h3 className="font-semibold mt-6 mb-2">Current Status</h3>
          <div className="bg-blue-50 p-3 rounded border border-blue-200">
            <p>The project is currently in the planning phase. The turbine acquisition strategy is the critical first decision point, with secondary market acquisition offering potential schedule compression of 24-32 weeks compared to ordering new units.</p>
          </div>
          
          <h3 className="font-semibold mt-6 mb-2">Turbine Acquisition Strategy</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div 
              className={`border p-3 rounded cursor-pointer ${turbineStrategy === 'secondary' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
              onClick={() => setTurbineStrategy('secondary')}
            >
              <div className="font-medium">Secondary Market</div>
              <div className="text-sm text-gray-500">Fastest, highest risk</div>
              <div className="mt-2 text-sm">Delivery: 90 days</div>
              <div className="text-sm">Cost: $4.4M per unit</div>
            </div>
            <div 
              className={`border p-3 rounded cursor-pointer ${turbineStrategy === 'new' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
              onClick={() => setTurbineStrategy('new')}
            >
              <div className="font-medium">New Units</div>
              <div className="text-sm text-gray-500">Slowest, lowest risk</div>
              <div className="mt-2 text-sm">Delivery: 270 days</div>
              <div className="text-sm">Cost: $6.25M per unit</div>
            </div>
            <div 
              className={`border p-3 rounded cursor-pointer ${turbineStrategy === 'hybrid' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
              onClick={() => setTurbineStrategy('hybrid')}
            >
              <div className="font-medium">Hybrid Approach</div>
              <div className="text-sm text-gray-500">Balanced option</div>
              <div className="mt-2 text-sm">Delivery: 180 days</div>
              <div className="text-sm">Cost: $5.4M per unit</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-800">Success Likelihood</h2>
          <SuccessGauge successRate={successRate} />
          
          <h3 className="font-semibold mt-6 mb-2">Key Performance Indicators</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded">
              <div className="text-sm text-gray-500">NPV</div>
              <div className="font-bold">${financialData.npv.toFixed(1)}M</div>
            </div>
            <div className="bg-green-50 p-3 rounded">
              <div className="text-sm text-gray-500">IRR</div>
              <div className="font-bold">{(financialData.irr * 100).toFixed(1)}%</div>
            </div>
            <div className="bg-purple-50 p-3 rounded">
              <div className="text-sm text-gray-500">Payback</div>
              <div className="font-bold">{financialData.paybackPeriod.toFixed(1)} years</div>
            </div>
            <div className="bg-orange-50 p-3 rounded">
              <div className="text-sm text-gray-500">LCOE</div>
              <div className="font-bold">${financialData.lcoe.toFixed(2)}/MWh</div>
            </div>
          </div>
          
          <h3 className="font-semibold mt-6 mb-2">Critical Success Factors</h3>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>Immediate decision-making authority</li>
            <li>Technical expertise with Solar Taurus</li>
            <li>Financial readiness for rapid transactions</li>
            <li>Logistical capabilities for equipment transport</li>
            <li>Flexible acceptance criteria for used equipment</li>
          </ul>
        </div>
      </div>
    );
  };
  
  // Project timeline tab content
  const ProjectTimeline = () => {
    return (
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-800">Project Timeline</h2>
          <TimelineChart data={timelineData} milestones={milestoneData} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="font-semibold mb-3">Critical Milestones</h3>
              <div className="space-y-2">
                {milestoneData.map((milestone, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-purple-600 mr-2"></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">{milestone.name}</span>
                        <span className="text-gray-500 text-sm">Day {milestone.day}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Success probability: {(milestone.success * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Timeline Options</h3>
              <div className="space-y-4">
                <div className="border rounded p-3 bg-red-50 border-red-200">
                  <div className="font-medium">Ultra-Expedited (November 2025)</div>
                  <div className="text-sm">Success likelihood: 65%</div>
                  <div className="text-sm mt-1">
                    7-month acceleration from baseline with premium labor costs (40-60% premium)
                  </div>
                </div>
                
                <div className="border rounded p-3 bg-blue-50 border-blue-200">
                  <div className="font-medium">Current Target (May 2026)</div>
                  <div className="text-sm">Success likelihood: 85%</div>
                  <div className="text-sm mt-1">
                    Balanced approach with moderate premium costs (15-25% premium)
                  </div>
                </div>
                
                <div className="border rounded p-3 bg-gray-50 border-gray-200">
                  <div className="font-medium">Original Schedule (June 2026)</div>
                  <div className="text-sm">Success likelihood: 95%</div>
                  <div className="text-sm mt-1">
                    Standard sequencing with appropriate commissioning timeframes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Financial analysis tab content
  const FinancialAnalysis = () => {
    return (
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-800">Financial Analysis</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <FinancialMetricCard 
              title="Net Present Value" 
              value={financialData.npv}
              format="currency"
              description="@ 8% discount rate"
            />
            <FinancialMetricCard 
              title="Internal Rate of Return" 
              value={financialData.irr}
              format="percent"
              description="Equity return"
            />
            <FinancialMetricCard 
              title="Payback Period" 
              value={financialData.paybackPeriod}
              format="years"
              description="Simple payback"
            />
            <FinancialMetricCard 
              title="LCOE" 
              value={financialData.lcoe}
              format="lcoe"
              description="Levelized cost of electricity"
            />
          </div>
          
          <h3 className="font-semibold mb-3">Project Cash Flow</h3>
          <CashFlowChart data={cashFlowData} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <BreakdownChart 
              data={capitalStructureData} 
              title="Capital Cost Breakdown"
            />
            <BreakdownChart 
              data={revenueData} 
              title="Revenue Breakdown"
            />
          </div>
          
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Key Financial Assumptions</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm text-gray-500">Electricity Price</div>
                <div className="font-medium">$65.00/MWh</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm text-gray-500">Thermal Energy Price</div>
                <div className="font-medium">$7.50/MMBtu</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm text-gray-500">Fuel Cost</div>
                <div className="font-medium">$3.50/MMBtu</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm text-gray-500">Debt Ratio</div>
                <div className="font-medium">70%</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm text-gray-500">Interest Rate</div>
                <div className="font-medium">5.5%</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm text-gray-500">Project Life</div>
                <div className="font-medium">25 years</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Risk analysis tab content
  const RiskAnalysis = () => {
    return (
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-800">Risk Analysis</h2>
          
          <RiskMatrix data={riskData} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="font-semibold mb-3">Top Risks by Category</h3>
              <div className="space-y-3">
                <div className="border-l-4 pl-3 py-1" style={{ borderColor: COLORS.RED }}>
                  <div className="font-medium">Financial Risks</div>
                  <div className="text-sm text-gray-600">Cost overruns (P=40%, I=70%)</div>
                  <div className="text-sm text-gray-600">Interest rate changes (P=30%, I=50%)</div>
                </div>
                <div className="border-l-4 pl-3 py-1" style={{ borderColor: COLORS.BLUE }}>
                  <div className="font-medium">Equipment Risks</div>
                  <div className="text-sm text-gray-600">Turbine condition (P=25%, I=70%)</div>
                  <div className="text-sm text-gray-600">Shipping delays (P=40%, I=50%)</div>
                </div>
                <div className="border-l-4 pl-3 py-1" style={{ borderColor: COLORS.ORANGE }}>
                  <div className="font-medium">Operational Risks</div>
                  <div className="text-sm text-gray-600">Fuel supply disruption (P=20%, I=80%)</div>
                  <div className="text-sm text-gray-600">Grid connection issues (P=15%, I=90%)</div>
                </div>
                <div className="border-l-4 pl-3 py-1" style={{ borderColor: COLORS.GREEN }}>
                  <div className="font-medium">Schedule Risks</div>
                  <div className="text-sm text-gray-600">Permitting delays (P=35%, I=80%)</div>
                  <div className="text-sm text-gray-600">Labor shortages (P=25%, I=60%)</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Risk Mitigation Strategies</h3>
              <div className="space-y-2">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-medium">Turbine Condition Risk</div>
                  <div className="text-sm">Thorough inspection and testing before purchase, including borescope inspections and vibration analysis</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-medium">Permitting Delays</div>
                  <div className="text-sm">Early engagement with authorities, dedicated permitting team, and expedited review fees</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-medium">Cost Overruns</div>
                  <div className="text-sm">Contingency budget (currently 7.2M) and robust cost control processes</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-medium">Grid Connection</div>
                  <div className="text-sm">Early utility coordination and backup interconnection plans</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Sensitivity analysis tab content
  const SensitivityAnalysisTab = () => {
    return (
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-800">Sensitivity Analysis</h2>
          
          <div className="mb-4">
            <div className="text-sm text-gray-500 mb-1">Select Financial Metric</div>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  className="form-radio"
                  name="metric"
                  value="npv"
                  checked={selectedFinancialMetric === "npv"}
                  onChange={() => setSelectedFinancialMetric("npv")}
                />
                <span className="ml-2">NPV</span>
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  className="form-radio"
                  name="metric"
                  value="irr"
                  checked={selectedFinancialMetric === "irr"}
                  onChange={() => setSelectedFinancialMetric("irr")}
                />
                <span className="ml-2">IRR</span>
              </label>
            </div>
          </div>
          
          <SensitivityChart data={sensitivityData} selectedMetric={selectedFinancialMetric} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="font-semibold mb-3">Key Sensitivity Findings</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Electricity price has the most significant positive impact on project returns</li>
                <li>Fuel cost increases can rapidly erode project economics</li>
                <li>Capital cost sensitivity is moderate but significant</li>
                <li>Plant availability has a linear relationship with returns</li>
                <li>10% change in electricity price impacts NPV by approximately 14.5%</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Break-Even Analysis</h3>
              <div className="space-y-2">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-medium">Electricity Price Break-Even</div>
                  <div className="text-sm">$56.20/MWh (13.5% below base case)</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-medium">Fuel Cost Break-Even</div>
                  <div className="text-sm">$4.62/MMBtu (32% above base case)</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-medium">CAPEX Break-Even</div>
                  <div className="text-sm">$138.5M (23.2% above base case)</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-medium">Availability Break-Even</div>
                  <div className="text-sm">86.4% (9.1% below base case)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Monte Carlo simulation tab content
  const MonteCarloTab = () => {
    const [selectedParameter, setSelectedParameter] = useState('npv');
    
    return (
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-800">Monte Carlo Simulation</h2>
          
          <div className="mb-4">
            <div className="text-sm text-gray-500 mb-1">Select Parameter</div>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  className="form-radio"
                  name="parameter"
                  value="npv"
                  checked={selectedParameter === "npv"}
                  onChange={() => setSelectedParameter("npv")}
                />
                <span className="ml-2">NPV</span>
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  className="form-radio"
                  name="parameter"
                  value="irr"
                  checked={selectedParameter === "irr"}
                  onChange={() => setSelectedParameter("irr")}
                />
                <span className="ml-2">IRR</span>
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  className="form-radio"
                  name="parameter"
                  value="completion"
                  checked={selectedParameter === "completion"}
                  onChange={() => setSelectedParameter("completion")}
                />
                <span className="ml-2">Completion Date</span>
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  className="form-radio"
                  name="parameter"
                  value="success"
                  checked={selectedParameter === "success"}
                  onChange={() => setSelectedParameter("success")}
                />
                <span className="ml-2">Success Likelihood</span>
              </label>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <MonteCarloChart data={monteCarloData} parameter={selectedParameter} />
            </div>
            <div>
              <MonteCarloSummary data={monteCarloData} parameter={selectedParameter} />
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Simulation Parameters</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm text-gray-500">Simulations Run</div>
                <div className="font-medium">1,000</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm text-gray-500">Electricity Price Range</div>
                <div className="font-medium">±20%</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm text-gray-500">Fuel Cost Range</div>
                <div className="font-medium">-10% to +30%</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm text-gray-500">CAPEX Range</div>
                <div className="font-medium">-10% to +15%</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm text-gray-500">Schedule Delay Range</div>
                <div className="font-medium">0 to 120 days</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm text-gray-500">Availability Range</div>
                <div className="font-medium">-5% to +2%</div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-blue-50 p-4 rounded border border-blue-200">
            <h3 className="font-semibold mb-2">Key Conclusions</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Project has an 87% probability of achieving positive NPV</li>
              <li>58% probability of completing by the target date of May 2026</li>
              <li>75% probability of achieving at least 12% IRR</li>
              <li>Monte Carlo simulation suggests project is financially robust across most scenarios</li>
              <li>Key risk mitigation should focus on timeline management and electricity price stability</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  // Render the appropriate tab content based on activeTabIndex
  const renderTabContent = () => {
    switch (activeTabIndex) {
      case 0:
        return <ProjectOverview />;
      case 1:
        return <ProjectTimeline />;
      case 2:
        return <FinancialAnalysis />;
      case 3:
        return <RiskAnalysis />;
      case 4:
        return <SensitivityAnalysisTab />;
      case 5:
        return <MonteCarloTab />;
      default:
        return <ProjectOverview />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-white">Blue Island CHP Project</h1>
          <p className="text-blue-100">Comprehensive Development Model Dashboard</p>
        </div>
        
        <TabSwitcher 
          tabs={tabs} 
          activeTabIndex={activeTabIndex} 
          setActiveTabIndex={setActiveTabIndex} 
        />
        
        {renderTabContent()}
        
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Dashboard updated: April 29, 2025 | Target completion: {completionDate}</p>
        </div>
      </div>
    </div>
  );
};

export default BlueIslandDashboard;
