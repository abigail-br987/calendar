
const benefitsList = [
    {
        title: 'Simplified Scheduling',
        description: 'Wave goodbye to endless email chains. Our app makes finding the right meeting time feel effortless, so you can focus on what really matters—connecting with others.'
    },
    {
        title: 'Boosted Productivity',
        description: 'By optimizing meeting times, you’ll spend less time coordinating and more time collaborating. This means you can get things done faster and feel accomplished.'
    },
    {
        title: 'Stronger Team Connections',
        description: 'When everyone has a say in when to meet, it creates a sense of unity and collaboration. Your team will feel more engaged, and meetings will become a platform for genuine connection.'
    },
    {
        title: 'User-Friendly Experience',
        description: 'With a clean and easy-to-navigate design, everyone—no matter their tech skills—can jump right in. We want scheduling to feel intuitive and enjoyable, not overwhelming.'
    },
];

const Benefits = () => {
  
    return (
      <div className="space-y-3" id="benefits">
        <h1 className="text-center">Benefits of timlot</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          {benefitsList.map((benefit, index) => (
            <div key={index} className="bg-primary border-2 border-black p-3 hover:scale-105 transition-all">
              <h2>{benefit.title}</h2>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Benefits;
  