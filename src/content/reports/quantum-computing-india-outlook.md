---
title: "Quantum Computing: Where It Is Today, Where India Stands, and Where It May Go"
summary: "A September 2026 assessment of quantum computing's technical maturity, commercial applications, India's capabilities and gaps, and the milestones likely to shape the next decade."
version: "1.0.0"
date: 2026-09-20
tags: ["quantum-computing", "india", "deep-tech", "technology-policy"]
---

**Status: September 2026**

The simplest way to understand the field is this:

> **Quantum computing is real, scientifically important, and progressing quickly—but most of its transformative commercial applications are still ahead of us.**

There are already working quantum computers with dozens to hundreds of physical qubits, experiments have started reaching regimes that leading classical methods struggle to reproduce, and quantum-security systems are already deployed commercially. But you should not imagine companies replacing AWS servers or conventional supercomputers with quantum computers today.

For India specifically, the picture is interesting. India is **not currently a global leader in general-purpose quantum-computing hardware**, but it has built a serious national program, has indigenous processors, a growing startup ecosystem, strong IT/software capability, and some genuinely deployed quantum-security systems. The Indian government's own assessments also acknowledge important gaps in patents, top-tier research, private investment, components, and large-scale hardware. ([NITI Aayog][1])

---

## 1. First: what exactly is a quantum computer?

A normal computer stores information in **bits**:

```text
0
or
1
```

A quantum computer uses **qubits**.

A qubit can be in a quantum state represented roughly as:

$$
|\psi\rangle = \alpha|0\rangle + \beta|1\rangle
$$

where the amplitudes \(\alpha\) and \(\beta\) determine the probabilities you obtain when measuring it.

Three properties matter particularly:

**Superposition** allows a quantum system to occupy combinations of basis states.

**Entanglement** creates correlations between qubits that classical bits cannot reproduce.

**Interference** lets a quantum algorithm suppress unwanted computational paths and amplify useful ones.

One common explanation says that a quantum computer "tries every possible answer simultaneously." That is misleading. With \(n\) qubits the quantum state involves \(2^n\) amplitudes, but you cannot simply read all \(2^n\) values. The algorithm has to manipulate those amplitudes so that measurement gives useful information.

That is why quantum algorithms—not merely large numbers of qubits—are so important. ([IBM][2])

---

## 2. Quantum computers will **not** replace normal computers

This distinction is extremely important.

A quantum computer is not expected to make:

* Chrome faster
* REST APIs faster
* PostgreSQL queries magically instantaneous
* video games universally faster
* Linux servers obsolete
* CPUs and GPUs unnecessary

Instead, think of it as another specialized accelerator.

Today:

```text
CPU
 ├── general computation
 ├── OS
 └── application logic

GPU
 └── massively parallel computation / AI

Quantum Processing Unit
 └── certain specialised simulation,
     optimization and mathematical problems
```

The architecture increasingly envisioned by IBM and others looks more like:

```text
                    APPLICATION
                         │
                         ▼
              Classical CPU / HPC
                  /           \
                 /             \
              GPU              QPU
              │                 │
             AI          quantum-specific
                         calculation
                 \             /
                  \           /
                     RESULT
```

IBM calls this **quantum-centric supercomputing**: classical HPC systems and quantum processors working together rather than quantum machines replacing classical computers. ([IBM][3])

![Image](https://research-website-prod-cms-uploads.s3.us.cloud-object-storage.appdomain.cloud/IBM_Quantum_Cryostat_blog_1db69479a0.jpg)

![Image](https://www.ibm.com/quantum/_next/image?q=75\&url=%2Fquantum%2F_next%2Fstatic%2Fmedia%2FInnovation_04.0t4jiwchu~.1a.jpg\&w=3840)

![Image](https://quantum.cloud.ibm.com/assets-docs-learning/_next/image?q=75\&url=%2Flearning%2Fimages%2Fcourses%2Fquantum-business-foundations%2Fintroduction-to-quantum-computing%2Fsystemone.avif\&w=3840)

The strange gold structure you often see in quantum-computer pictures is largely the refrigeration and wiring system. Superconducting processors such as IBM's and QpiAI's operate at temperatures extremely close to absolute zero.

---

# 3. Why do we even need quantum computers?

There are computational problems where the number of possibilities explodes.

Imagine trying to find the best combination among millions or billions of possible configurations.

A classical machine may have to use approximations, heuristics, enormous HPC clusters, or simply accept that an exact computation would take too long.

Some quantum algorithms can exploit the mathematical structure of such problems differently.

There are roughly **four major application families** attracting the most attention.

| Area             | Example                                                        |
| ---------------- | -------------------------------------------------------------- |
| Simulation       | molecules, chemicals, materials                                |
| Optimization     | logistics, scheduling, portfolios                              |
| Machine learning | specialized ML subroutines                                     |
| Cryptography     | breaking some old cryptography / creating quantum-safe systems |

TCS similarly groups potential applications into optimization, simulation, quantum machine learning and security. ([Tata Consultancy Services][4])

---

# 4. Probably the most important future use case: chemistry and materials

This may ultimately prove more important than flashy "quantum AI" claims.

Nature itself operates quantum mechanically.

If you want to accurately simulate:

```text
electrons
↓
atoms
↓
molecules
↓
chemical reactions
↓
materials
```

you are essentially asking a classical computer to simulate a quantum system.

That becomes extraordinarily expensive as system complexity increases.

Quantum computers are themselves quantum systems, making them a natural candidate for these simulations.

Potential applications include:

**Pharmaceuticals**

```text
Disease target
      ↓
Millions of candidate molecules
      ↓
Molecular interaction simulations
      ↓
Promising candidates
      ↓
Laboratory testing
```

Quantum computing could eventually improve portions of this process.

Potential applications include drug-target interactions, reaction-energy calculations and molecular electronic structures. Current machines can only tackle relatively small/simplified examples; large-scale drug discovery remains a future goal. ([Tata Consultancy Services][5])

**Battery research**

Researchers could model new:

* electrolytes
* cathode materials
* catalysts
* superconductors

more accurately.

**Energy**

Possible areas include:

* hydrogen production
* carbon capture catalysts
* solar-cell materials
* fusion-material modelling

This is one reason chemistry, life sciences and materials repeatedly appear near the top of quantum-industry roadmaps. McKinsey expects chemicals and life sciences to be among the industries where quantum technology could generate substantial value. ([McKinsey & Company][6])

---

# 5. Optimization

This is probably the application software engineers encounter first.

Consider Amazon-style logistics.

You might have:

```text
10,000 packages
500 trucks
hundreds of warehouses
traffic
fuel cost
delivery deadlines
truck capacities
driver availability
```

and ask:

> What combination minimizes total cost while satisfying every constraint?

Similar problems occur everywhere.

### Logistics

Potential applications:

* vehicle routing
* warehouse placement
* container loading
* airline scheduling
* fleet allocation

### Manufacturing

Potential applications:

* production scheduling
* factory layouts
* robotics
* supply chains
* component configuration

### Telecom

Potential applications:

* spectrum allocation
* network routing
* tower/resource allocation

### Energy

Potential applications:

* grid optimization
* renewable generation scheduling
* battery/storage allocation

Quantum annealing, quantum-inspired algorithms and gate-based quantum optimization are all being investigated here. Many current examples are still pilots rather than demonstrated superiority over the best classical optimization systems. TCS's quantum lab, for example, experiments with truck-load optimization, routing, portfolio optimization and similar problems. ([Tata Consultancy Services][7])

---

# 6. Finance

Finance has many enormous optimization and simulation problems.

Consider portfolio construction.

Suppose you have:

```text
5,000 securities
```

and many constraints:

```text
expected return
risk
correlation
sector allocation
liquidity
exposure limits
tax implications
```

The combination space becomes huge.

Quantum research therefore looks at:

* portfolio optimization
* derivatives pricing
* Monte Carlo acceleration
* credit risk
* fraud detection
* scenario analysis

But this distinction matters:

> **Banks are experimenting with these technologies; quantum computers have not replaced classical financial systems.**

Even TCS describes much of this activity in terms of prospective use cases, experimentation and demonstrators rather than mainstream production infrastructure. ([Tata Consultancy Services][4])

---

# 7. Automotive and aerospace

These industries have massive simulation workloads.

Examples include:

```text
airflow around aircraft
fluid dynamics
battery behaviour
engine cooling
structural optimization
vehicle design
manufacturing optimization
```

BMW, for example, is researching quantum techniques for vehicle electrical/mechanical architecture, drivetrains, cooling, engine and battery integration and factory robot routing. BMW itself says practical industrial quantum-computing adoption remains at an early stage. ([BMW Group][8])

Airbus is investigating quantum techniques for:

* computational fluid dynamics
* aerodynamics
* flight physics
* materials
* optimization

and runs quantum-computing challenges around industrial aerospace problems. ([Airbus][9])

---

# 8. Artificial intelligence + quantum computing

You will hear the phrase **Quantum Machine Learning (QML)** frequently.

Possible future applications include:

```text
classification
optimization
sampling
feature mapping
generative models
```

But I would be considerably more cautious about this area than popular articles often are.

Modern GPUs are extraordinarily effective at ML. A useful QML system must therefore beat something like:

```text
NVIDIA/AMD accelerators
+
excellent classical algorithms
+
massive software ecosystems
```

not merely demonstrate that an algorithm runs on a quantum computer.

So QML is worth researching, but claims like:

> "Quantum computers will make AI exponentially faster"

are far too broad today.

---

# 9. Cryptography: where quantum already matters

This is different.

A sufficiently powerful fault-tolerant quantum computer running **Shor's algorithm** could threaten cryptosystems based on integer factorization and discrete logarithms, notably RSA and elliptic-curve cryptography.

Today's machines cannot practically break internet-scale RSA.

But there is a problem called:

### Harvest now, decrypt later

An attacker can potentially:

```text
steal encrypted information today
             ↓
store it
             ↓
wait years
             ↓
obtain sufficiently capable quantum computer
             ↓
decrypt historically sensitive information
```

That matters for information that must remain secret for decades.

This is why governments and companies are already migrating toward **post-quantum cryptography (PQC)**.

The OECD identifies cryptographic transition as one of the immediate policy/security consequences of quantum computing. ([OECD][10])

---

# 10. Important distinction: QKD isn't quantum computing

You will see Indian articles saying things like:

> "India deployed quantum technology."

Frequently they are referring to **Quantum Key Distribution (QKD)**.

Quantum technology contains several related industries:

```text
QUANTUM TECHNOLOGY
│
├── Quantum Computing
│
│    └── QPUs, algorithms, simulation
│
├── Quantum Communication
│
│    └── QKD, quantum networks
│
├── Quantum Sensing
│
│    └── magnetometers, clocks, imaging
│
└── Quantum Materials / Devices
```

These are related but different.

India is currently noticeably further along commercially in **quantum communication/security** than in useful general-purpose quantum computing. India's own NITI Aayog roadmap reaches essentially the same conclusion: quantum communication is comparatively strong, while quantum computing still has clear value-chain gaps. ([NITI Aayog][1])

---

# 11. Where quantum technology is actually being used in India today

This is one of the most important parts of your question.

## Case 1 — Indian Armed Forces / QNu Labs

This is one of India's clearest examples of genuine deployment rather than a laboratory demo.

Bengaluru startup **QNu Labs** developed quantum-secure networking technology.

According to DST:

* it developed a 150 km QKD system and completed trials with the Indian Army;
* it received an order to build quantum-secure wired networks for the Armed Forces;
* quantum-secure wireless/VPN systems were used at MCEME and MCTE;
* in 2024 it delivered **25 QKD systems to the Indian Navy**;
* its QRNG technology has been supplied for critical applications involving DRDO/WESEE;
* and it later demonstrated a **500 km QKD network** over existing optical-fibre infrastructure. ([DST][11])

That is not hypothetical quantum computing.

It is actual deployed **quantum-security technology**.

---

# 12. QpiAI: indigenous Indian quantum computers

One of India's most significant hardware companies is Bengaluru-based **QpiAI**.

In April 2025 it launched **QpiAI Indus**, a full-stack system containing a **25-qubit superconducting processor**. ([Press Information Bureau][12])

It subsequently developed **Kaveri**, a 64-qubit superconducting QPU. The DST 2025–26 annual report identifies the 64-qubit processor as one of the National Quantum Mission's major accomplishments. ([DST][13])

In March 2026, QpiAI reported implementing real-time error correction on Kaveri using a hardware decoder and a distance-5 rotated surface code. ([QpiAI][14])

The company has also begun deploying smaller systems. It announced a 25-qubit Indus installation for IIIT Dharwad/Raichur and an eight-qubit quantum experience centre with Alliance University in 2026. ([QpiAI][15])

This makes QpiAI particularly important because India is not merely writing quantum software—it is developing parts of the actual stack:

```text
Quantum chip
   ↓
control electronics
   ↓
QPU
   ↓
software stack
   ↓
HPC integration
   ↓
applications
```

---

# 13. Amaravati Quantum Valley

Another major development is Andhra Pradesh's **Quantum Valley** in Amaravati.

IBM, TCS and the Andhra Pradesh government announced plans for an **IBM Quantum System Two**, initially described with a 156-qubit Heron processor. TCS is responsible for developing algorithms and applications and connecting Indian researchers and industries with IBM's quantum infrastructure. ([IBM India News Room][16])

Construction formally began in February 2026. While construction was underway, TCS already had cloud access to IBM systems for skills development and quantum experimentation. ([IBM][17])

A July 2026 update targeted commissioning of the Amaravati system by the end of September 2026. As of September 19, I would treat the physical machine as **being deployed/commissioned rather than assume it is already operational**, because I have not found a sufficiently authoritative confirmation of completed commissioning yet. ([India Brand Equity Foundation][18])

Once operational, this could become an important shared Indian quantum-computing facility for universities, companies and startups.

---

# 14. India's National Quantum Mission

The biggest strategic move came in 2023.

The Government of India approved the **National Quantum Mission (NQM)** with:

**₹6,003.65 crore**

of funding from FY2023–24 through FY2030–31. ([PSA][19])

Its targets include development of intermediate-scale systems containing roughly **50–1,000 physical qubits** across technologies such as superconducting and photonic computing.

It also targets:

* satellite quantum communication
* 2,000 km secure quantum links
* inter-city QKD
* quantum networks
* atomic clocks
* magnetometers
* quantum materials
* photon sources/detectors. ([PSA][19])

---

# 15. India created four major Quantum Hubs

The mission established four thematic hubs:

| Hub                         | Institution        | Area                         |
| --------------------------- | ------------------ | ---------------------------- |
| Quantum Computing           | IISc Bengaluru     | quantum processors/computing |
| Quantum Communication       | IIT Madras + C-DOT | networks/QKD                 |
| Quantum Sensing & Metrology | IIT Bombay         | sensors/clocks/metrology     |
| Quantum Materials & Devices | IIT Delhi          | devices/materials            |

Together they currently involve **152 researchers across 43 institutions** and multiple technical groups around the country. ([PSA][19])

India is also pursuing multiple hardware architectures instead of betting everything on one:

* superconducting qubits — TIFR
* neutral atoms — Raman Research Institute
* trapped ions — IISER Pune
* semiconductor qubits — IIT Bombay
* photonic computing — IISc

That diversification is sensible because globally there is still no universally accepted winning qubit architecture. ([Press Information Bureau][20])

---

# 16. Indian quantum startups you should know

The National Quantum Mission currently highlights eight startups receiving dedicated support. ([Press Information Bureau][21])

| Company                 | Work                                                       |
| ----------------------- | ---------------------------------------------------------- |
| **QpiAI**               | superconducting quantum computers, software, hybrid AI/HPC |
| **QNu Labs**            | QKD, QRNG, quantum-secure networking                       |
| **Dimira Technologies** | cryogenic RF/microwave cabling and quantum infrastructure  |
| **PrenishQ**            | precision lasers, atomic/quantum systems                   |
| **QuPrayog**            | atomic clocks and quantum sensing                          |
| **Pristine Diamonds**   | diamond materials for quantum sensors                      |
| **Quanastra**           | cryogenics and superconducting photon detectors            |
| **Quan2D Technologies** | superconducting nanowire single-photon detectors           |

For example, Dimira—an IIT Bombay spin-off—is developing high-density flexible cryogenic I/O cables, which are an important but less glamorous bottleneck when trying to connect and control increasingly large superconducting QPUs. ([Dimira Technologies][22])

PrenishQ has developed an indigenous high-precision diode laser for quantum research, communication and computing. ([DST][23])

QuPrayog works on optical atomic-clock technology, while Pristine Diamonds and Quan2D/Quanastra work in quantum materials and photon-detection infrastructure. ([Press Information Bureau][24])

These component companies matter. A country cannot have a truly independent quantum industry if it has to import every:

```text
cryogenic cable
laser
detector
control system
dilution refrigerator
microwave component
specialised material
```

required to build the computer.

---

# 17. BQP / BosonQ Psi

Another interesting company with substantial engineering activity in Bengaluru is **BQP**, formerly BosonQ Psi.

BQP focuses on engineering simulation rather than constructing QPUs.

Its BQPhy platform applies quantum-inspired and hybrid techniques to simulation problems such as computational fluid dynamics and digital twins for sectors including:

* aerospace
* defence
* semiconductors
* energy.

Importantly, much of its current platform can run **without requiring a quantum computer**, using quantum-inspired mathematical techniques on today's infrastructure. ([BQP][25])

This illustrates an important trend:

> Some businesses may make money from **quantum-inspired algorithms long before fault-tolerant quantum computers become mainstream**.

---

# 18. India's big IT companies are also preparing

India's IT-services companies have another role: building the software/services layer.

### TCS

TCS operates quantum-computing labs, including facilities based on AWS Braket, for:

* optimization
* ML
* chemistry
* security
* routing
* portfolio optimization.

It is also IBM's primary industry partner in Amaravati's Quantum Valley. ([Tata Consultancy Services][7])

### Tech Mahindra

Tech Mahindra's Makers Lab works on:

* quantum security
* QML
* drug-discovery experiments
* quantum networking
* quantum optimization.

It has relationships with IBM Quantum, AWS, IQM, C-DAC, QNu Labs and BQP among others. ([Tech Mahindra | Scale at Speed][26])

### Wipro

Wipro operates its **Quantum Leap** enterprise-readiness program and established research collaboration with IISc covering quantum computing, AI and secure infrastructure. ([Wipro][27])

### LTIMindtree / L&T

LTIMindtree is part of the Amaravati Quantum Valley ecosystem and operates a Quantum Centre of Excellence focused on applied research and industry use cases. ([LTM][28])

NITI Aayog also identifies quantum programs inside **Infosys, HCL, TCS, Wipro and LTIMindtree**, although these programs vary considerably in maturity. ([NITI Aayog][1])

So there are really two Indian quantum industries forming:

```text
Deep-tech companies
     │
     ├── hardware
     ├── sensors
     ├── QKD
     └── components

IT services companies
     │
     ├── algorithms
     ├── consulting
     ├── cloud QC
     ├── quantum software
     └── enterprise integration
```

---

# 19. Where does India actually stand globally?

This requires separating ambition from current reality.

India's own NITI Aayog analysis gives a particularly useful picture.

## Research

Indian-affiliated authors represented roughly **2% of quantum-relevant publications in 2023–24**. India was within the broad top-ten group by publication contribution, but China produced more than 20 times India's share according to the data used in the report. ([NITI Aayog][29])

The share of Indian publications classified among highly ranked/high-impact work was approximately:

| Area                  | Share |
| --------------------- | ----: |
| Quantum computing     |  9.7% |
| Quantum communication |  9.4% |
| Quantum materials     |   12% |
| Quantum sensing       |  8.7% |

NITI concludes that India has reasonable publication quantity but needs significant improvement in research quality/impact. ([NITI Aayog][1])

---

## Patents

India does **not yet rank among the top 10 countries by quantum-patent ownership** in NITI's assessment. ([NITI Aayog][1])

That's an important weakness because research leadership and commercial leadership aren't the same thing.

---

## Government investment

India has made a meaningful national commitment.

OECD's 2025 comparison placed India's announced quantum public investment at around **US$0.7 billion**, broadly consistent with the ₹6,003.65 crore NQM scale.

For context, the same OECD comparison listed approximately:

```text
EU total      $8.4B
US            $5.0B
Germany       $3.3B
Canada        $1.1B
Netherlands   $1.0B
Japan         $0.7B
India         $0.7B
```

The funding programs are not perfectly comparable in scope or timing, so these should be treated as broad scale indicators rather than a league table. ([OECD][30])

---

# 20. India's strongest and weakest points

India's strongest assets are probably:

**Software engineering talent.**

India could potentially become a major source of:

* quantum algorithms
* middleware
* cloud quantum platforms
* hybrid HPC/quantum orchestration
* quantum consulting
* PQC migration.

**Quantum communication.**

This is currently India's relatively mature quantum segment, with real QKD deployments and defence customers.

**Large domestic customer base.**

Defence, banks, telecom, pharma, oil and gas, logistics and manufacturing can become early customers.

**National coordination.**

NQM now provides a common structure connecting universities, government labs and startups.

NITI therefore sees quantum software/services as a particularly large strategic opportunity for India. ([NITI Aayog][29])

---

India's major weaknesses are also fairly clear.

### Private investment

The government is currently doing much of the heavy lifting.

NITI describes Indian private investment in quantum R&D as comparatively low and notes that many Indian startups remain in early validation stages. ([NITI Aayog][1])

### Hardware supply chain

India still depends substantially on foreign suppliers for things such as:

* cryogenic systems
* precision electronics
* optics
* fabrication tools
* specialised components.

### Research impact

India produces meaningful research volume but comparatively fewer top-tier quantum publications.

### Commercial customers

Companies are understandably reluctant to spend heavily on technology whose near-term ROI is difficult to demonstrate.

This leads to a classic deep-tech problem:

```text
No mature hardware
     ↓
few commercial applications
     ↓
few customers
     ↓
less private capital
     ↓
harder to build mature hardware
```

Government procurement and defence are therefore especially important as early customers.

---

# 21. How far ahead are the global leaders?

The US ecosystem still has companies such as:

* IBM
* Google
* Microsoft
* Amazon
* Quantinuum
* IonQ
* Rigetti

and enormous private capital.

China has enormous research output and particularly significant capabilities in quantum communication.

Europe has major programs and companies such as:

* IQM
* Pasqal
* Alice & Bob
* Quandela.

The OECD's 2025 global mapping concludes that the **United States leads in innovation and funding**, while Europe and Asia have substantial ecosystems of their own. ([OECD][31])

India should therefore currently be thought of as an **important emerging quantum country rather than one of the current technological front-runners**.

Its position resembles:

```text
Leading group
━━━━━━━━━━━━━━━━━━━━
US
China
major European ecosystems
Japan etc.

        ↑
        technological gap

India
━━━━━━━━━━━━━━━━━━━━
large talent base
serious government mission
emerging hardware
growing startup ecosystem
strong software potential
comparatively mature QKD
but weaker patents/private investment/
hardware supply chain
```

That gap is not necessarily permanent.

---

# 22. A major global milestone occurred in 2026

For years people discussed "quantum advantage": performing useful computations beyond what classical computers can practically accomplish.

In July 2026, IBM and researchers at the University of Chicago announced experiments they describe as demonstrating quantum advantage using encoded quantum circuits, including a calculation they said took about 15 minutes while leading known classical approaches were infeasible. Related IBM/Qedma work explored quantum-material dynamics beyond the reach of the classical methods tested. ([IBM Newsroom][32])

These are important developments, but there is a distinction between:

```text
scientific quantum advantage
```

and

```text
commercial quantum advantage
```

Solving a specially structured scientific problem classical computers struggle with is a major milestone.

It does **not** mean:

> "Quantum computers are now faster for normal enterprise workloads."

The quantum/classical competition also moves continuously because better classical algorithms can sometimes overturn earlier quantum-advantage claims. IBM itself maintains an open "Quantum Advantage Tracker" partly for exactly this reason. ([IBM][33])

---

# 23. Error correction is the real battle

Today's machines are noisy.

Qubits lose their quantum state through:

### Decoherence

Interactions with the environment destroy the information.

And quantum gates have errors.

Suppose your computation requires:

```text
10,000,000 reliable operations
```

but your hardware produces an error every few hundred or thousand operations.

You have a serious problem.

The solution is **quantum error correction**.

Instead of:

```text
1 physical qubit = 1 reliable qubit
```

you use multiple physical qubits to encode a more reliable:

```text
logical qubit
```

Google's Willow work demonstrated an important milestone: increasing the size of its surface-code error-corrected qubit reduced logical errors exponentially, showing operation below the required error-correction threshold. That work was published in *Nature*. ([Nature][34])

This is one of the reasons qubit-count headlines alone are not very useful.

A:

```text
5,000 noisy-qubit system
```

is not automatically better than:

```text
500 extremely high-quality qubits.
```

You need to care about:

* fidelity
* coherence
* connectivity
* gate depth
* logical qubits
* error rates
* throughput

not merely qubit count.

---

# 24. So when will quantum computing become commercially important?

Nobody knows precisely.

Vendor roadmaps are aggressive.

IBM currently plans its fault-tolerant **Starling** system for 2029, targeting approximately 200 logical qubits and 100 million quantum gates. IBM explicitly describes this as a roadmap rather than a guarantee. ([IBM][35])

A sensible way to think about the future is in phases.

### 2026–2028

Expect rapid growth in:

```text
PQC migration
QKD deployments
quantum cloud access
research
hybrid quantum/HPC
quantum simulation
small commercial pilots
quantum-inspired algorithms
```

rather than wholesale replacement of classical computing.

### Around 2028–2032

If current hardware and error-correction roadmaps work, we could begin seeing commercially valuable quantum advantage in selected:

```text
chemistry
materials
optimization
scientific simulation
```

workloads.

### 2030–2035

If fault-tolerant machines scale successfully, quantum could become a normal specialist component of HPC infrastructure.

The architecture may look like:

```text
Cloud / Supercomputer
│
├── CPUs
├── GPUs
├── AI accelerators
└── QPUs
```

rather than a "quantum laptop."

---

# 25. How big could the market become?

There is enormous uncertainty here.

McKinsey's 2025 Quantum Technology Monitor estimates that by 2035:

* quantum computing revenue could reach roughly **$28–72 billion**;
* quantum communications **$11–15 billion**;
* quantum sensing **$7–10 billion**;

giving total quantum-technology revenue potentially approaching **$97 billion annually** by 2035. ([McKinsey & Company][6])

Those are forecasts, not guarantees.

The more meaningful signal is investment.

Nearly **$2 billion went into quantum-technology startups globally during 2024**, while large governments have announced multibillion-dollar national programs. ([McKinsey & Company][6])

Countries are investing because quantum has implications for:

```text
economic competitiveness
+
cybersecurity
+
defence
+
scientific research
```

not solely because they expect immediate startup revenue.

---

# 26. What I think India should particularly focus on

Looking at India's existing strengths and the government's own gap analysis, four opportunities make considerable sense.

### 1. Quantum software

India does not necessarily have to beat IBM or Google at manufacturing every QPU.

There could be enormous opportunity one layer higher:

```text
Quantum hardware
      ↓
Indian SDK / compiler / orchestration
      ↓
industry algorithms
      ↓
enterprise applications
```

This resembles India's historic advantage in software and IT services.

### 2. Quantum cybersecurity

India already has a relatively strong foundation through QNu Labs, C-DOT, defence deployments and NQM.

Both **PQC and quantum networking** could become meaningful industries even before large-scale quantum computers arrive.

### 3. Quantum components

Companies such as:

* Dimira
* PrenishQ
* Quanastra
* Quan2D
* Pristine Diamonds

matter strategically because they can reduce India's dependence on imported quantum hardware infrastructure.

### 4. Domain-specific applications

Rather than creating generic "quantum apps," India could target areas in which the country has enormous commercial demand:

```text
pharma
financial services
logistics
telecom
energy
defence
space
manufacturing
```

---

# 27. India's 2035 ambition is extremely aggressive

NITI Aayog's 2025 roadmap proposes goals including:

* becoming a **top-three quantum economy**
* producing 10+ globally significant quantum startups
* capturing a very large share of global quantum software/services
* deploying quantum technologies across multiple strategic sectors
* training 100,000+ quantum developers
* dramatically increasing patent generation. ([NITI Aayog][29])

Those are strategic **targets**, not forecasts.

Given India's current ~2% share of quantum-related research authorship, absence from the top ten quantum patent-owning countries and relatively weak private R&D funding, achieving them would require a very large acceleration. ([NITI Aayog][29])

---

# 28. The reality in one table

| Technology                    | Reality in 2026             | India                                                    |
| ----------------------------- | --------------------------- | -------------------------------------------------------- |
| Quantum computing hardware    | Rapidly improving           | Indigenous 25/64-qubit work; still behind global leaders |
| Fault-tolerant QC             | Experimental                | Early research/QEC development                           |
| Quantum chemistry             | Advanced research           | Early research/PoCs                                      |
| Optimization                  | Pilots/hybrid               | TCS/TechM/startups experimenting                         |
| Quantum ML                    | Research-heavy              | Research/PoCs                                            |
| QKD                           | **Commercially deployable** | **Real defence/network deployments**                     |
| PQC                           | **Deploying now**           | Growing rapidly                                          |
| Quantum sensing               | Emerging commercial tech    | Several indigenous prototypes                            |
| Quantum materials/components  | Growing                     | NQM-backed startups                                      |
| General enterprise QC         | Early                       | Mostly experiments/PoCs                                  |
| Replacing classical computers | No                          | No                                                       |

---

# 29. The key idea I would take away

The quantum industry is roughly where computing has been at previous historical inflection points—but the analogy should not be taken too literally.

The important transition occurring now is:

```text
1990s–2015
"What can quantum computers theoretically do?"

          ↓

2015–2024
"Can we actually build reasonably large machines?"

          ↓

2024–2027
"Can we control errors and beat classical methods?"

          ↓

next stage
"Can that advantage solve something valuable enough
that a business will pay for it?"
```

We are around that **third-to-fourth transition** now.

That is why the next five years are likely to be considerably more informative than the previous twenty.

---

# 30. What this means for India

I would summarize India's position as:

> **India is late relative to the earliest quantum leaders, but early relative to the eventual commercial quantum economy.**

The country already possesses:

```text
✓ National Quantum Mission
✓ ₹6,003.65 crore public commitment
✓ 4 national quantum hubs
✓ 43 participating institutions
✓ indigenous superconducting QPUs
✓ actual quantum-security deployments
✓ component startups
✓ major IT-services companies entering quantum
✓ large software-engineering talent base
```

but still has significant weaknesses:

```text
✗ lower private R&D investment
✗ comparatively weak patent ownership
✗ dependence on imported specialised hardware
✗ fewer globally leading research results
✗ few proven commercial QC applications
✗ shortage of highly specialised hardware talent
✗ many startups remain early-stage
```

India's own 2025 national roadmap explicitly acknowledges essentially this mixed picture: quantum communication is comparatively strong, quantum computing has gaps, private capital is limited, and supply-chain dependence remains a problem. ([NITI Aayog][1])

So I would **not** describe India as a global quantum-computing leader today.

But I also wouldn't dismiss its chances. Building indigenous 64-qubit hardware, setting up a national mission, moving toward an IBM System Two installation, developing QKD deployments and building an ecosystem of quantum-component startups are significant steps for an industry that is still globally immature. ([DST][13])

And perhaps the most interesting opportunity for India isn't necessarily building the world's best quantum processor.

It may be becoming a major global centre for the layer immediately above it:

```text
             Quantum Hardware
                    │
             Quantum Cloud
                    │
       ┌────────────┴─────────────┐
       │                          │
   Algorithms                Middleware
       │                          │
       └────────────┬─────────────┘
                    │
          Quantum + HPC + AI
                    │
       Industry-specific software
                    │
 ┌────────┬─────────┼────────┬─────────┐
 Pharma  Finance  Logistics Energy Manufacturing
```

That part of the stack aligns unusually well with India's existing software, engineering, consulting and enterprise-technology ecosystem.

If quantum hardware reaches reliable fault tolerance during the next decade, **that software and application layer could become the larger economic opportunity for India than manufacturing the QPU itself**—which is exactly why TCS, Wipro, Tech Mahindra, LTIMindtree, Infosys and others are starting their programs before mature hardware fully exists. ([NITI Aayog][1])

[1]: https://www.niti.gov.in/node/2050 "NITI Aayog"
[2]: https://www.ibm.com/think/topics/quantum-computing "What Is Quantum Computing? | IBM"
[3]: https://www.ibm.com/quantum/hardware "IBM Quantum Computing | Hardware and roadmap"
[4]: https://www.tcs.com/what-we-do/pace-innovation/article/quantum-advantage-think-big-move-fast "Quantum Machines and its Power to Solve Multidimensional Problems"
[5]: https://www.tcs.com/what-we-do/industries/life-sciences/white-paper/quantum-computing-use-life-sciences-future-ready "Use of Quantum Computing for Life Sciences to be Future Ready"
[6]: https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/the-year-of-quantum-from-concept-to-reality-in-2025 "Quantum Technology Monitor 2025 | McKinsey"
[7]: https://www.tcs.com/what-we-do/services/cloud/aws/solution/quantum-computing-lab-aws "TCS Quantum Computing Lab on AWS"
[8]: https://www.bmwgroup.com/en/news/general/2025/quantum-computing.html "Quantum Computing at the BMW Group"
[9]: https://www.airbus.com/en/innovation/digital-transformation/quantum-technologies "Quantum technologies | Airbus"
[10]: https://www.oecd.org/en/topics/sub-issues/quantum-technologies.html "Quantum technologies | OECD"
[11]: https://dst.gov.in/node/8112 "Quantum Startup: QNu Labs working to build and deploy world's first end-to-end quantum- safe heterogeneous network | Department Of Science & Technology  | Department Of Science & Technology (DST)"
[12]: https://www.pib.gov.in/PressReleasePage.aspx?PRID=2121845&lang=2&reg=48 "Press Release Page | Press Information Bureau"
[13]: https://dst.gov.in/sites/default/files/DST%20AR%20%202025-26%20ENG_Web.pdf "Untitled-1"
[14]: https://www.qpiai.tech/pressreleases/2026-03-25-qpiai-achieves-high-speed-quantum-error-correction-on-superconducting-systems-with-new-decoder-platform "QpiAI"
[15]: https://www.qpiai.tech/newsroom "QpiAI"
[16]: https://in.newsroom.ibm.com/2025-05-02-IBM-TCS-AP-Govt-unveil-plans-to-deploy-Indias-largest-quantum-computer "IBM India News Room - Announcements"
[17]: https://www.ibm.com/quantum/blog/quantum-education-india "Breaking ground on India’s quantum future | IBM Quantum Computing Blog"
[18]: https://www.ibef.org/news/ibm-to-set-up-one-of-india-s-first-quantum-computers-in-amaravati-by-september-2026 "IBM to set up one of India's first quantum computers in Amaravati by September 2026 | IBEF"
[19]: https://www.psa.gov.in/national-quantum-mission "National Quantum Mission"
[20]: https://www.pib.gov.in/PressReleasePage.aspx?PRID=2158388&lang=2&reg=3 "Press Release Page | Press Information Bureau"
[21]: https://www.pib.gov.in/PressReleasePage.aspx?PRID=2204761&lang=1&reg=3 "Press Release Page | Press Information Bureau"
[22]: https://dimiratech.com/about "About Us — Dimira Technologies"
[23]: https://dst.gov.in/nqm-supported-startup-demonstrates-indias-first-indigenous-high-precision-diode-laser-quantum "NQM supported startup demonstrates India's first indigenous high precision diode laser for quantum encrypted communication and computing | Department Of Science & Technology  | Department Of Science & Technology (DST)"
[24]: https://www.pib.gov.in/PressReleasePage.aspx?PRID=2077635&lang=2&reg=48 "Press Release Page | Press Information Bureau"
[25]: https://www.bqpsim.com/ "BQP | Quantum Optimization Platform (formerly BosonQ Psi)"
[26]: https://www.techmahindra.com/about-us/spotlight/makers-lab/quantum-computing/ "Quantum Computing | Tech Mahindra"
[27]: https://www.wipro.com/innovation/emerging-technologies/quantum-technologies-at-wipro/offerings/quantum-leap/ "Quantum Leap - Wipro"
[28]: https://www.ltm.com/news-events/press-releases/2025/ltimindtree-join-india-first-quantum-valley-in-amravati "LTIMindtree Joins India’s First Quantum Valley in Amaravati in Collaboration with Government of Andhra Pradesh and Industry Partners"
[29]: https://www.niti.gov.in/sites/default/files/2025-11/Roadmap_for_Transforming_India_into_a_Leading_Quantum_Powered_Economy.pdf "4.2.3 Research"
[30]: https://www.oecd.org/content/dam/oecd/en/publications/reports/2025/01/a-quantum-technologies-policy-primer_bdac5544/fd1153c3-en.pdf "A quantum technologies policy primer (EN)"
[31]: https://www.oecd.org/en/publications/mapping-the-global-quantum-ecosystem_010c37da-en.html "Mapping the global quantum ecosystem | OECD"
[32]: https://newsroom.ibm.com/2026-07-30-ibm-and-the-university-of-chicago-demonstrate-quantum-advantage%2C-establishing-trusted-quantum-computation-on-logical-circuits "IBM and The University of Chicago Demonstrate Quantum Advantage, Establishing Trusted Quantum Computation on Logical Circuits"
[33]: https://www.ibm.com/quantum/blog/quantum-advantage-tracker "Quantum Advantage Tracker: the race to advantage | IBM Quantum Computing Blog"
[34]: https://www.nature.com/articles/s41586-024-08449-y "Quantum error correction below the surface code threshold | Nature"
[35]: https://www.ibm.com/roadmaps/quantum/ "Quantum Roadmap — IBM Technology Atlas"
