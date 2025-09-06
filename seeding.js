// seeding.js
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://ramsai123:atlas%40123@quiz.6pchbrd.mongodb.net/?retryWrites=true&w=majority&appName=quiz")
    .then(() => console.log("MongoDB connected for seeding"))
    .catch(err => console.error("MongoDB connection error:", err));

const QuestionSchema = new mongoose.Schema({
    category: String,
    difficulty: String,
    question: String,
    optionA: String,
    optionB: String,
    optionC: String,
    optionD: String,
    answer: String
});

const Question = mongoose.model('Question', QuestionSchema);

const seedData = [
    {
        "question": "What does CPU stand for?",
        "optionA": "Central Peripheral Unit",
        "optionB": "Central Processing Unit",
        "optionC": "Computer Processing Unit",
        "optionD": "Control Processing Unit",
        "answer": "Central Processing Unit",
        "category": "cse",
        "difficulty": "easy"
    },
    {
        "question": "What is the basic unit of a computer memory?",
        "optionA": "Bit",
        "optionB": "Byte",
        "optionC": "Kilobyte",
        "optionD": "Megabyte",
        "answer": "Bit",
        "category": "cse",
        "difficulty": "easy"
    },
    {
        "question": "Which is the smallest data type in C?",
        "optionA": "int",
        "optionB": "char",
        "optionC": "float",
        "optionD": "double",
        "answer": "char",
        "category": "cse",
        "difficulty": "easy"
    },
    {
        "question": "Which command is used to compile a C program?",
        "optionA": "gcc",
        "optionB": "run",
        "optionC": "exec",
        "optionD": "compile",
        "answer": "gcc",
        "category": "cse",
        "difficulty": "easy"
    },
    {
        "question": "In Python, what symbol is used for comments?",
        "optionA": "//",
        "optionB": "#",
        "optionC": "/* */",
        "optionD": "--",
        "answer": "#",
        "category": "cse",
        "difficulty": "easy"
    },
    {
        "question": "Which protocol is used to send emails?",
        "optionA": "HTTP",
        "optionB": "SMTP",
        "optionC": "FTP",
        "optionD": "SNMP",
        "answer": "SMTP",
        "category": "cse",
        "difficulty": "easy"
    },
    {
        "question": "What is the full form of RAM?",
        "optionA": "Read Access Memory",
        "optionB": "Random Access Memory",
        "optionC": "Reusable Access Memory",
        "optionD": "Ready Access Memory",
        "answer": "Random Access Memory",
        "category": "cse",
        "difficulty": "easy"
    },
    {
        "question": "Which gate has output true only if both inputs are true?",
        "optionA": "OR",
        "optionB": "AND",
        "optionC": "NAND",
        "optionD": "NOR",
        "answer": "AND",
        "category": "cse",
        "difficulty": "easy"
    },
    {
        "question": "Which of the following is an operating system?",
        "optionA": "Oracle",
        "optionB": "Linux",
        "optionC": "Python",
        "optionD": "MySQL",
        "answer": "Linux",
        "category": "cse",
        "difficulty": "easy"
    },
    {
        "question": "Which networking device connects different networks?",
        "optionA": "Switch",
        "optionB": "Router",
        "optionC": "Bridge",
        "optionD": "Repeater",
        "answer": "Router",
        "category": "cse",
        "difficulty": "easy"
    },
    {
        "question": "Which of these is a loop construct in C?",
        "optionA": "for",
        "optionB": "define",
        "optionC": "include",
        "optionD": "struct",
        "answer": "for",
        "category": "cse",
        "difficulty": "easy"
    },
    {
        "question": "Which language is used for web development?",
        "optionA": "HTML",
        "optionB": "C++",
        "optionC": "Assembly",
        "optionD": "Cobol",
        "answer": "HTML",
        "category": "cse",
        "difficulty": "easy"
    },
    {
        "question": "What is the output of 2 + 2 in Python?",
        "optionA": "22",
        "optionB": "4",
        "optionC": "Error",
        "optionD": "None",
        "answer": "4",
        "category": "cse",
        "difficulty": "easy"
    },
    {
        "question": "Which of these is a data structure?",
        "optionA": "Array",
        "optionB": "If",
        "optionC": "Return",
        "optionD": "Minus",
        "answer": "Array",
        "category": "cse",
        "difficulty": "easy"
    },
    {
        "question": "Which company developed Java language?",
        "optionA": "Microsoft",
        "optionB": "Sun Microsystems",
        "optionC": "Oracle",
        "optionD": "IBM",
        "answer": "Sun Microsystems",
        "category": "cse",
        "difficulty": "easy"
    },
    {
        "question": "What is the time complexity of binary search?",
        "optionA": "O(n)",
        "optionB": "O(log n)",
        "optionC": "O(n log n)",
        "optionD": "O(1)",
        "answer": "O(log n)",
        "category": "cse",
        "difficulty": "medium"
    },
    {
        "question": "Which sorting algorithm is best for nearly sorted arrays?",
        "optionA": "Quick Sort",
        "optionB": "Bubble Sort",
        "optionC": "Insertion Sort",
        "optionD": "Selection Sort",
        "answer": "Insertion Sort",
        "category": "cse",
        "difficulty": "medium"
    },
    {
        "question": "What does SQL stand for?",
        "optionA": "Simple Query Language",
        "optionB": "Structured Query Language",
        "optionC": "System Query Language",
        "optionD": "Sequential Query Language",
        "answer": "Structured Query Language",
        "category": "cse",
        "difficulty": "medium"
    },
    {
        "question": "Which algorithm is used in Dijkstra's shortest path?",
        "optionA": "Greedy",
        "optionB": "Backtracking",
        "optionC": "Divide and Conquer",
        "optionD": "Brute Force",
        "answer": "Greedy",
        "category": "cse",
        "difficulty": "medium"
    },
    {
        "question": "Which of the following is not a database model?",
        "optionA": "Hierarchical",
        "optionB": "Relational",
        "optionC": "Network",
        "optionD": "Procedural",
        "answer": "Procedural",
        "category": "cse",
        "difficulty": "medium"
    },
    {
        "question": "Which is not a primitive data type in Java?",
        "optionA": "int",
        "optionB": "char",
        "optionC": "String",
        "optionD": "double",
        "answer": "String",
        "category": "cse",
        "difficulty": "medium"
    },
    {
        "question": "What is the parent class of all Java classes?",
        "optionA": "Object",
        "optionB": "Class",
        "optionC": "Root",
        "optionD": "Superclass",
        "answer": "Object",
        "category": "cse",
        "difficulty": "medium"
    },
    {
        "question": "Which HTML tag is used to connect CSS?",
        "optionA": "<link>",
        "optionB": "<script>",
        "optionC": "<style>",
        "optionD": "<meta>",
        "answer": "<link>",
        "category": "cse",
        "difficulty": "medium"
    },
    {
        "question": "TCP and UDP are protocols of which layer?",
        "optionA": "Network",
        "optionB": "Transport",
        "optionC": "Application",
        "optionD": "Physical",
        "answer": "Transport",
        "category": "cse",
        "difficulty": "medium"
    },
    {
        "question": "Which of the following is a non-linear data structure?",
        "optionA": "Array",
        "optionB": "Stack",
        "optionC": "Queue",
        "optionD": "Tree",
        "answer": "Tree",
        "category": "cse",
        "difficulty": "medium"
    },
    {
        "question": "Recursion is used to solve problems that can be broken into?",
        "optionA": "Smaller sub-problems",
        "optionB": "Larger problems",
        "optionC": "Parallel problems",
        "optionD": "One step",
        "answer": "Smaller sub-problems",
        "category": "cse",
        "difficulty": "medium"
    },
    {
        "question": "Which is not optional in a function definition?",
        "optionA": "Return type",
        "optionB": "Function name",
        "optionC": "Parameters",
        "optionD": "Arguments",
        "answer": "Function name",
        "category": "cse",
        "difficulty": "medium"
    },
    {
        "question": "Which is used to enforce referential integrity in databases?",
        "optionA": "Primary Key",
        "optionB": "Foreign Key",
        "optionC": "Index",
        "optionD": "View",
        "answer": "Foreign Key",
        "category": "cse",
        "difficulty": "medium"
    },
    {
        "question": "Which is not a valid HTTP method?",
        "optionA": "GET",
        "optionB": "POST",
        "optionC": "FETCH",
        "optionD": "PUT",
        "answer": "FETCH",
        "category": "cse",
        "difficulty": "medium"
    },
    {
        "question": "Which keyword is used to create a class in C++?",
        "optionA": "object",
        "optionB": "class",
        "optionC": "struct",
        "optionD": "function",
        "answer": "class",
        "category": "cse",
        "difficulty": "medium"
    },
    {
        "question": "What does LED stand for?",
        "optionA": "Light Emitting Diode",
        "optionB": "Low Energy Diode",
        "optionC": "Light Energy Device",
        "optionD": "Long Emitting Device",
        "answer": "Light Emitting Diode",
        "category": "ece",
        "difficulty": "easy"
    },
    {
        "question": "How many pins are there in a standard IC 7400?",
        "optionA": "14",
        "optionB": "8",
        "optionC": "16",
        "optionD": "10",
        "answer": "14",
        "category": "ece",
        "difficulty": "easy"
    },
    {
        "question": "Which device converts AC to DC?",
        "optionA": "Transformer",
        "optionB": "Rectifier",
        "optionC": "Amplifier",
        "optionD": "Oscillator",
        "answer": "Rectifier",
        "category": "ece",
        "difficulty": "easy"
    },
    {
        "question": "What does VLSI stand for?",
        "optionA": "Very Large Scale Integration",
        "optionB": "Variable Level Signal Indication",
        "optionC": "Voltage Level Signal Inverter",
        "optionD": "Very Low Signal Integration",
        "answer": "Very Large Scale Integration",
        "category": "ece",
        "difficulty": "easy"
    },
    {
        "question": "Which law is used in electrical circuits?",
        "optionA": "Boyle's Law",
        "optionB": "Kirchhoff's Law",
        "optionC": "Newton's Law",
        "optionD": "Faraday's Law",
        "answer": "Kirchhoff's Law",
        "category": "ece",
        "difficulty": "easy"
    },
    {
        "question": "Which is used for wireless communication?",
        "optionA": "Transmitter",
        "optionB": "Resistor",
        "optionC": "Capacitor",
        "optionD": "Inductor",
        "answer": "Transmitter",
        "category": "ece",
        "difficulty": "easy"
    },
    {
        "question": "Which element is used for doping in a p-type semiconductor?",
        "optionA": "Boron",
        "optionB": "Phosphorus",
        "optionC": "Antimony",
        "optionD": "Arsenic",
        "answer": "Boron",
        "category": "ece",
        "difficulty": "easy"
    },
    {
        "question": "What is the value of 1 kilo-ohm?",
        "optionA": "100 ohms",
        "optionB": "1,000 ohms",
        "optionC": "10,000 ohms",
        "optionD": "1,000,000 ohms",
        "answer": "1,000 ohms",
        "category": "ece",
        "difficulty": "easy"
    },
    {
        "question": "Which material is used to make wires?",
        "optionA": "Plastic",
        "optionB": "Copper",
        "optionC": "Glass",
        "optionD": "Rubber",
        "answer": "Copper",
        "category": "ece",
        "difficulty": "easy"
    },
    {
        "question": "Which device amplifies signals?",
        "optionA": "Resistor",
        "optionB": "Capacitor",
        "optionC": "Amplifier",
        "optionD": "Transmitter",
        "answer": "Amplifier",
        "category": "ece",
        "difficulty": "easy"
    },
    {
        "question": "In which unit is frequency measured?",
        "optionA": "Volt",
        "optionB": "Ohm",
        "optionC": "Hertz",
        "optionD": "Ampere",
        "answer": "Hertz",
        "category": "ece",
        "difficulty": "easy"
    },
    {
        "question": "Which is the symbol for resistance?",
        "optionA": "Ω",
        "optionB": "μ",
        "optionC": "λ",
        "optionD": "π",
        "answer": "Ω",
        "category": "ece",
        "difficulty": "easy"
    },
    {
        "question": "Which device stores charge?",
        "optionA": "Resistor",
        "optionB": "Capacitor",
        "optionC": "Inductor",
        "optionD": "Diode",
        "answer": "Capacitor",
        "category": "ece",
        "difficulty": "easy"
    },
    {
        "question": "In electronic circuits, what does DC stand for?",
        "optionA": "Direct Current",
        "optionB": "Double Current",
        "optionC": "Dual Charge",
        "optionD": "Dynamic Circuit",
        "answer": "Direct Current",
        "category": "ece",
        "difficulty": "easy"
    },
    {
        "question": "Which device converts electrical energy to mechanical energy?",
        "optionA": "Motor",
        "optionB": "Resistor",
        "optionC": "Capacitor",
        "optionD": "Switch",
        "answer": "Motor",
        "category": "ece",
        "difficulty": "easy"
    },
    {
        "question": "Which modulation technique is used in radio transmission?",
        "optionA": "Amplitude Modulation",
        "optionB": "Frequency Modulation",
        "optionC": "Phase Modulation",
        "optionD": "Pulse Modulation",
        "answer": "Frequency Modulation",
        "category": "ece",
        "difficulty": "medium"
    },
    {
        "question": "Which transistor type has three terminals called emitter, base, collector?",
        "optionA": "Field Effect Transistor",
        "optionB": "Bipolar Junction Transistor",
        "optionC": "SCR",
        "optionD": "MOSFET",
        "answer": "Bipolar Junction Transistor",
        "category": "ece",
        "difficulty": "medium"
    },
    {
        "question": "Which element is used for doping in an n-type semiconductor?",
        "optionA": "Boron",
        "optionB": "Phosphorus",
        "optionC": "Gallium",
        "optionD": "Indium",
        "answer": "Phosphorus",
        "category": "ece",
        "difficulty": "medium"
    },
    {
        "question": "Which device is used as a voltage regulator?",
        "optionA": "Zener Diode",
        "optionB": "LED",
        "optionC": "Capacitor",
        "optionD": "SCR",
        "answer": "Zener Diode",
        "category": "ece",
        "difficulty": "medium"
    },
    {
        "question": "Which is the function of a filter circuit?",
        "optionA": "Amplify signal",
        "optionB": "Convert AC to DC",
        "optionC": "Remove unwanted frequencies",
        "optionD": "Store charge",
        "answer": "Remove unwanted frequencies",
        "category": "ece",
        "difficulty": "medium"
    },
    {
        "question": "The step-up transformer does what?",
        "optionA": "Increases voltage",
        "optionB": "Decreases voltage",
        "optionC": "Stores current",
        "optionD": "Amplifies signal",
        "answer": "Increases voltage",
        "category": "ece",
        "difficulty": "medium"
    },
    {
        "question": "Which process converts digital signals to analog?",
        "optionA": "ADC",
        "optionB": "DAC",
        "optionC": "CPU",
        "optionD": "Register",
        "answer": "DAC",
        "category": "ece",
        "difficulty": "medium"
    },
    {
        "question": "Which communication device boosts signal strength?",
        "optionA": "Repeater",
        "optionB": "Modulator",
        "optionC": "Oscillator",
        "optionD": "Transformer",
        "answer": "Repeater",
        "category": "ece",
        "difficulty": "medium"
    },
    {
        "question": "In digital electronics, 'flip-flop' is used for?",
        "optionA": "Amplification",
        "optionB": "Storing bit",
        "optionC": "Adding numbers",
        "optionD": "Filtering signal",
        "answer": "Storing bit",
        "category": "ece",
        "difficulty": "medium"
    },
    {
        "question": "Which device is used for tuning a radio?",
        "optionA": "Variable Capacitor",
        "optionB": "Inductor",
        "optionC": "Resistor",
        "optionD": "LED",
        "answer": "Variable Capacitor",
        "category": "ece",
        "difficulty": "medium"
    },
    {
        "question": "Which filter allows high frequencies to pass?",
        "optionA": "Low Pass Filter",
        "optionB": "High Pass Filter",
        "optionC": "Band Pass Filter",
        "optionD": "Stop Band Filter",
        "answer": "High Pass Filter",
        "category": "ece",
        "difficulty": "medium"
    },
    {
        "question": "Which is a passive component?",
        "optionA": "Capacitor",
        "optionB": "Transistor",
        "optionC": "Op-Amp",
        "optionD": "Diode",
        "answer": "Capacitor",
        "category": "ece",
        "difficulty": "medium"
    },
    {
        "question": "Which device converts mechanical energy to electrical energy?",
        "optionA": "Generator",
        "optionB": "Motor",
        "optionC": "Amplifier",
        "optionD": "Diode",
        "answer": "Generator",
        "category": "ece",
        "difficulty": "medium"
    },
    {
        "question": "Which of the following modulation technique is digital?",
        "optionA": "ASK",
        "optionB": "FSK",
        "optionC": "PSK",
        "optionD": "All the above",
        "answer": "All the above",
        "category": "ece",
        "difficulty": "medium"
    },
    {
        "question": "What does a photodiode do?",
        "optionA": "Emits light",
        "optionB": "Controls voltage",
        "optionC": "Measures light intensity",
        "optionD": "Amplifies current",
        "answer": "Measures light intensity",
        "category": "ece",
        "difficulty": "medium"
    },
    {
        "question": "Which law states that stress is directly proportional to strain within elastic limit?",
        "optionA": "Newton’s Law",
        "optionB": "Hooke’s Law",
        "optionC": "Pascal’s Law",
        "optionD": "Boyle’s Law",
        "answer": "Hooke’s Law",
        "category": "mechanical",
        "difficulty": "easy"
    },
    {
        "question": "Which unit is used to measure force?",
        "optionA": "Newton",
        "optionB": "Joule",
        "optionC": "Watt",
        "optionD": "Pascal",
        "answer": "Newton",
        "category": "mechanical",
        "difficulty": "easy"
    },
    {
        "question": "Which process is used to join two metals using heat and a filler material?",
        "optionA": "Casting",
        "optionB": "Welding",
        "optionC": "Forging",
        "optionD": "Rolling",
        "answer": "Welding",
        "category": "mechanical",
        "difficulty": "easy"
    },
    {
        "question": "What is the SI unit of pressure?",
        "optionA": "Pascal",
        "optionB": "Newton",
        "optionC": "Bar",
        "optionD": "Joule",
        "answer": "Pascal",
        "category": "mechanical",
        "difficulty": "easy"
    },
    {
        "question": "Which cycle is used in a petrol engine?",
        "optionA": "Otto Cycle",
        "optionB": "Diesel Cycle",
        "optionC": "Rankine Cycle",
        "optionD": "Carnot Cycle",
        "answer": "Otto Cycle",
        "category": "mechanical",
        "difficulty": "easy"
    },
    {
        "question": "Which device converts heat energy into mechanical work?",
        "optionA": "Motor",
        "optionB": "Engine",
        "optionC": "Pump",
        "optionD": "Compressor",
        "answer": "Engine",
        "category": "mechanical",
        "difficulty": "easy"
    },
    {
        "question": "Which property of a material resists permanent deformation?",
        "optionA": "Ductility",
        "optionB": "Elasticity",
        "optionC": "Plasticity",
        "optionD": "Hardness",
        "answer": "Elasticity",
        "category": "mechanical",
        "difficulty": "easy"
    },
    {
        "question": "Which instrument is used to measure temperature?",
        "optionA": "Manometer",
        "optionB": "Barometer",
        "optionC": "Thermometer",
        "optionD": "Hygrometer",
        "answer": "Thermometer",
        "category": "mechanical",
        "difficulty": "easy"
    },
    {
        "question": "Which gas law states that pressure is inversely proportional to volume at constant temperature?",
        "optionA": "Boyle’s Law",
        "optionB": "Charles’s Law",
        "optionC": "Avogadro’s Law",
        "optionD": "Pascal’s Law",
        "answer": "Boyle’s Law",
        "category": "mechanical",
        "difficulty": "easy"
    },
    {
        "question": "Which is a rotary machine used to compress air?",
        "optionA": "Pump",
        "optionB": "Turbine",
        "optionC": "Compressor",
        "optionD": "Motor",
        "answer": "Compressor",
        "category": "mechanical",
        "difficulty": "easy"
    },
    {
        "question": "Which material is commonly used for bearings?",
        "optionA": "Cast Iron",
        "optionB": "Gun Metal",
        "optionC": "Mild Steel",
        "optionD": "Brass",
        "answer": "Gun Metal",
        "category": "mechanical",
        "difficulty": "easy"
    },
    {
        "question": "Which machine element is used to transmit motion between parallel shafts?",
        "optionA": "Gear",
        "optionB": "Pulley",
        "optionC": "Bearing",
        "optionD": "Key",
        "answer": "Gear",
        "category": "mechanical",
        "difficulty": "easy"
    },
    {
        "question": "What is the function of a flywheel?",
        "optionA": "To increase torque",
        "optionB": "To regulate speed",
        "optionC": "To reduce friction",
        "optionD": "To transmit power",
        "answer": "To regulate speed",
        "category": "mechanical",
        "difficulty": "easy"
    },
    {
        "question": "Which type of stress is produced in a shaft under torsion?",
        "optionA": "Tensile Stress",
        "optionB": "Shear Stress",
        "optionC": "Compressive Stress",
        "optionD": "Bending Stress",
        "answer": "Shear Stress",
        "category": "mechanical",
        "difficulty": "easy"
    },
    {
        "question": "Which part of an IC engine mixes fuel with air?",
        "optionA": "Injector",
        "optionB": "Carburetor",
        "optionC": "Cylinder",
        "optionD": "Piston",
        "answer": "Carburetor",
        "category": "mechanical",
        "difficulty": "easy"
    },
    {
        "question": "In Rankine cycle, which component converts steam energy into mechanical work?",
        "optionA": "Pump",
        "optionB": "Turbine",
        "optionC": "Condenser",
        "optionD": "Boiler",
        "answer": "Turbine",
        "category": "mechanical",
        "difficulty": "medium"
    },
    {
        "question": "The ratio of lateral strain to longitudinal strain is known as?",
        "optionA": "Young’s Modulus",
        "optionB": "Bulk Modulus",
        "optionC": "Poisson’s Ratio",
        "optionD": "Shear Modulus",
        "answer": "Poisson’s Ratio",
        "category": "mechanical",
        "difficulty": "medium"
    },
    {
        "question": "Which of the following processes is used in the manufacturing of seamless tubes?",
        "optionA": "Extrusion",
        "optionB": "Rolling",
        "optionC": "Drawing",
        "optionD": "Piercing",
        "answer": "Piercing",
        "category": "mechanical",
        "difficulty": "medium"
    },
    {
        "question": "What is the function of a governor in an engine?",
        "optionA": "To increase power output",
        "optionB": "To regulate fuel supply",
        "optionC": "To maintain constant speed",
        "optionD": "To reduce vibrations",
        "answer": "To maintain constant speed",
        "category": "mechanical",
        "difficulty": "medium"
    },
    {
        "question": "Which type of welding uses a non-consumable tungsten electrode?",
        "optionA": "MIG Welding",
        "optionB": "TIG Welding",
        "optionC": "Arc Welding",
        "optionD": "Gas Welding",
        "answer": "TIG Welding",
        "category": "mechanical",
        "difficulty": "medium"
    },
    {
        "question": "In a centrifugal pump, what happens if the discharge valve is closed while the pump is running?",
        "optionA": "Pump runs without damage",
        "optionB": "Pump delivers maximum flow",
        "optionC": "Pump gets overheated",
        "optionD": "Pump stops automatically",
        "answer": "Pump gets overheated",
        "category": "mechanical",
        "difficulty": "medium"
    },
    {
        "question": "Which type of gear is used to transmit motion between intersecting shafts?",
        "optionA": "Spur Gear",
        "optionB": "Bevel Gear",
        "optionC": "Helical Gear",
        "optionD": "Worm Gear",
        "answer": "Bevel Gear",
        "category": "mechanical",
        "difficulty": "medium"
    },
    {
        "question": "In heat treatment, which process increases hardness of steel?",
        "optionA": "Annealing",
        "optionB": "Normalizing",
        "optionC": "Quenching",
        "optionD": "Tempering",
        "answer": "Quenching",
        "category": "mechanical",
        "difficulty": "medium"
    },
    {
        "question": "Reynolds number is used to determine?",
        "optionA": "Type of flow",
        "optionB": "Heat transfer rate",
        "optionC": "Pressure drop",
        "optionD": "Fluid density",
        "answer": "Type of flow",
        "category": "mechanical",
        "difficulty": "medium"
    },
    {
        "question": "The ratio of actual velocity of fluid jet to theoretical velocity is called?",
        "optionA": "Coefficient of Discharge",
        "optionB": "Coefficient of Velocity",
        "optionC": "Coefficient of Contraction",
        "optionD": "Reynolds Number",
        "answer": "Coefficient of Velocity",
        "category": "mechanical",
        "difficulty": "medium"
    },
    {
        "question": "In thermodynamics, entropy is a measure of?",
        "optionA": "Temperature",
        "optionB": "Disorder",
        "optionC": "Pressure",
        "optionD": "Energy",
        "answer": "Disorder",
        "category": "mechanical",
        "difficulty": "medium"
    },
    {
        "question": "Which casting defect occurs due to improper venting of gases?",
        "optionA": "Hot Tear",
        "optionB": "Blow Hole",
        "optionC": "Cold Shut",
        "optionD": "Shrinkage Cavity",
        "answer": "Blow Hole",
        "category": "mechanical",
        "difficulty": "medium"
    },
    {
        "question": "What is the function of a fusible plug in a boiler?",
        "optionA": "To control pressure",
        "optionB": "To maintain water level",
        "optionC": "To extinguish fire when water level is low",
        "optionD": "To supply steam",
        "answer": "To extinguish fire when water level is low",
        "category": "mechanical",
        "difficulty": "medium"
    },
    {
        "question": "In gas turbines, regeneration improves?",
        "optionA": "Efficiency",
        "optionB": "Power output",
        "optionC": "Pressure ratio",
        "optionD": "Heat input",
        "answer": "Efficiency",
        "category": "mechanical",
        "difficulty": "medium"
    },
    {
        "question": "Which test is used to determine the hardness of materials using a diamond indenter?",
        "optionA": "Brinell Hardness Test",
        "optionB": "Rockwell Hardness Test",
        "optionC": "Vickers Hardness Test",
        "optionD": "Izod Test",
        "answer": "Vickers Hardness Test",
        "category": "mechanical",
        "difficulty": "medium"
    }


]


const seedDB = async () => {
    try {
        await Question.deleteMany({});
        await Question.insertMany(seedData);
        console.log("Seeding successful! Inserted questions:", seedData.length);
    } catch (err) {
        console.error("Error seeding database:", err);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
