// ==========================================
// PREPMATE - CENTRAL DATA STORE (data.js)
// Comprehensive dataset for placement prep
// ==========================================

const PREP_DATA = {
  // ----------------------------------------
  // 1. APTITUDE QUESTIONS (18 High Quality Questions)
  // ----------------------------------------
  aptitudeQuestions: [
    // --- Quantitative Aptitude ---
    {
      id: 1,
      category: "Quantitative Aptitude",
      difficulty: "Easy",
      question: "If a train travels 120 km in 2 hours, what is its average speed?",
      options: ["40 km/h", "50 km/h", "60 km/h", "80 km/h"],
      correctAnswer: 2, // 60 km/h (index 2)
      explanation: "Average Speed = Total Distance / Total Time = 120 km / 2 hrs = 60 km/h."
    },
    {
      id: 2,
      category: "Quantitative Aptitude",
      difficulty: "Medium",
      question: "A person sells an article for $840 at a profit of 20%. What was the cost price of the article?",
      options: ["$700", "$680", "$720", "$750"],
      correctAnswer: 0, // $700
      explanation: "Selling Price = Cost Price * (1 + Profit%). 840 = CP * 1.20 => CP = 840 / 1.20 = $700."
    },
    {
      id: 3,
      category: "Quantitative Aptitude",
      difficulty: "Medium",
      question: "Pipe A can fill a tank in 6 hours, and Pipe B can empty it in 8 hours. If both pipes are opened together, how long will it take to fill the tank?",
      options: ["18 hours", "24 hours", "12 hours", "16 hours"],
      correctAnswer: 1, // 24 hours
      explanation: "Net rate per hour = (1/6 - 1/8) = (4 - 3)/24 = 1/24. Therefore, tank fills in 24 hours."
    },
    {
      id: 4,
      category: "Quantitative Aptitude",
      difficulty: "Hard",
      question: "A sum of money invested at compound interest doubles itself in 4 years. In how many years will it become 8 times its initial value at the same interest rate?",
      options: ["8 years", "12 years", "16 years", "10 years"],
      correctAnswer: 1, // 12 years
      explanation: "If sum becomes 2^1 in 4 years, it becomes 8 = 2^3 in 3 * 4 = 12 years."
    },
    {
      id: 5,
      category: "Quantitative Aptitude",
      difficulty: "Easy",
      question: "The average of five consecutive even numbers is 26. What is the smallest of these numbers?",
      options: ["20", "22", "24", "26"],
      correctAnswer: 1, // 22
      explanation: "For consecutive numbers, the average is the middle number. Middle (3rd) is 26. The 5 numbers are 22, 24, 26, 28, 30. Smallest is 22."
    },
    {
      id: 6,
      category: "Quantitative Aptitude",
      difficulty: "Medium",
      question: "In how many different ways can the letters of the word 'LEADER' be arranged?",
      options: ["720", "360", "120", "240"],
      correctAnswer: 1, // 360
      explanation: "The word 'LEADER' has 6 letters with 'E' repeating 2 times. Total permutations = 6! / 2! = 720 / 2 = 360."
    },

    // --- Logical Reasoning ---
    {
      id: 7,
      category: "Logical Reasoning",
      difficulty: "Easy",
      question: "Find the next number in the series: 3, 7, 15, 31, 63, ?",
      options: ["95", "127", "125", "128"],
      correctAnswer: 1, // 127
      explanation: "Pattern: Each number is (Previous Number * 2) + 1. 63 * 2 + 1 = 127."
    },
    {
      id: 8,
      category: "Logical Reasoning",
      difficulty: "Medium",
      question: "Pointing to a photograph, Rohit said, 'She is the daughter of my grandfather's only son.' How is Rohit related to the girl?",
      options: ["Father", "Brother", "Cousin", "Uncle"],
      correctAnswer: 1, // Brother
      explanation: "Grandfather's only son = Rohit's father. Daughter of Rohit's father = Rohit's sister. Rohit is her brother."
    },
    {
      id: 9,
      category: "Logical Reasoning",
      difficulty: "Easy",
      question: "If in a certain code language, 'APPLE' is written as 'BQQMF', how will 'MANGO' be written in that code?",
      options: ["NBOHP", "NBOGP", "NAOHP", "NBOIP"],
      correctAnswer: 0, // NBOHP
      explanation: "Each letter is shifted forward by +1 position in the alphabet. M->N, A->B, N->O, G->H, O->P."
    },
    {
      id: 10,
      category: "Logical Reasoning",
      difficulty: "Medium",
      question: "Statements: All cars are vehicles. Some vehicles are electric. Conclusions: I. Some cars are electric. II. Some electric items are vehicles.",
      options: ["Only conclusion I follows", "Only conclusion II follows", "Both I and II follow", "Neither follows"],
      correctAnswer: 1, // Only conclusion II follows
      explanation: "Since some vehicles are electric, by converse, some electric items are vehicles (II follows). Cars and electric may not overlap, so I does not necessarily follow."
    },
    {
      id: 11,
      category: "Logical Reasoning",
      difficulty: "Hard",
      question: "Six friends A, B, C, D, E, and F are sitting in a circle facing the center. B is between D and C. A is second to the left of E and second to the right of C. Who is facing D?",
      options: ["A", "E", "F", "C"],
      correctAnswer: 1, // E
      explanation: "Placing positions clockwise: C, B, D, F, E, A. D is directly opposite and facing E."
    },
    {
      id: 12,
      category: "Logical Reasoning",
      difficulty: "Medium",
      question: "Which word does NOT belong with the others? (Apple, Banana, Carrot, Orange)",
      options: ["Apple", "Banana", "Carrot", "Orange"],
      correctAnswer: 2, // Carrot
      explanation: "Carrot is a root vegetable, whereas Apple, Banana, and Orange are fruits."
    },

    // --- Verbal Ability ---
    {
      id: 13,
      category: "Verbal Ability",
      difficulty: "Easy",
      question: "Choose the antonym for the word: 'METICULOUS'",
      options: ["Careful", "Careless", "Thorough", "Detailed"],
      correctAnswer: 1, // Careless
      explanation: "'Meticulous' means showing great attention to detail. Its opposite is 'Careless'."
    },
    {
      id: 14,
      category: "Verbal Ability",
      difficulty: "Medium",
      question: "Select the correctly spelt word:",
      options: ["Accommodate", "Acommodate", "Accomodate", "Acomodate"],
      correctAnswer: 0, // Accommodate
      explanation: "The correct spelling is 'Accommodate' with double 'c' and double 'm'."
    },
    {
      id: 15,
      category: "Verbal Ability",
      difficulty: "Easy",
      question: "Fill in the blank: She was surprised ___ his sudden resignation.",
      options: ["with", "at", "on", "for"],
      correctAnswer: 1, // at
      explanation: "The preposition 'at' or 'by' is commonly used with 'surprised' when responding to an event or action."
    },
    {
      id: 16,
      category: "Verbal Ability",
      difficulty: "Medium",
      question: "Identify the idiom meaning: 'To burn the candle at both ends'",
      options: [
        "To waste money recklessly",
        "To work very hard from morning till late night",
        "To create double illumination",
        "To have multiple conflicting goals"
      ],
      correctAnswer: 1, // To work very hard...
      explanation: "'To burn the candle at both ends' means to exhaust oneself by doing too much, often waking early and staying up late."
    },
    {
      id: 17,
      category: "Verbal Ability",
      difficulty: "Hard",
      question: "Select the option that best replaces the underlined phrase: 'He is *one of those men who is* always willing to help.'",
      options: [
        "one of those men who are",
        "one of the man who is",
        "one among those men who is",
        "No correction required"
      ],
      correctAnswer: 0, // one of those men who are
      explanation: "The relative pronoun 'who' refers to the plural antecedent 'men', so it takes the plural verb 'are'."
    },
    {
      id: 18,
      category: "Verbal Ability",
      difficulty: "Medium",
      question: "Choose the synonym for: 'CANDID'",
      options: ["Secretive", "Frank", "Deceitful", "Shy"],
      correctAnswer: 1, // Frank
      explanation: "'Candid' means truthful, straightforward, and frank."
    }
  ],

  // ----------------------------------------
  // 2. DSA PROBLEMS (20 Curated Problems)
  // ----------------------------------------
  dsaProblems: [
    {
      id: "dsa-1",
      title: "Two Sum",
      topic: "Arrays",
      difficulty: "Easy",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      exampleInput: "nums = [2, 7, 11, 15], target = 9",
      exampleOutput: "[0, 1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      constraints: "2 <= nums.length <= 10^4, -10^9 <= nums[i] <= 10^9",
      hint: "Use a Hash Map to store complement (target - num) and index while iterating."
    },
    {
      id: "dsa-2",
      title: "Best Time to Buy and Sell Stock",
      topic: "Arrays",
      difficulty: "Easy",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize profit by choosing a single day to buy and a different day in the future to sell.",
      exampleInput: "prices = [7, 1, 5, 3, 6, 4]",
      exampleOutput: "5",
      explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.",
      constraints: "1 <= prices.length <= 10^5, 0 <= prices[i] <= 10^4",
      hint: "Track min_price seen so far and max_profit = max(max_profit, current_price - min_price)."
    },
    {
      id: "dsa-3",
      title: "Maximum Subarray (Kadane's)",
      topic: "Arrays",
      difficulty: "Medium",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
      exampleInput: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
      exampleOutput: "6",
      explanation: "Subarray [4, -1, 2, 1] has the largest sum = 6.",
      constraints: "1 <= nums.length <= 10^5, -10^4 <= nums[i] <= 10^4",
      hint: "Maintain currentSum. If currentSum drops below 0, reset it to 0. Update max_sum at each step."
    },
    {
      id: "dsa-4",
      title: "Valid Anagram",
      topic: "Strings",
      difficulty: "Easy",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
      exampleInput: "s = 'anagram', t = 'nagaram'",
      exampleOutput: "true",
      explanation: "Both strings contain the exact same frequency of every character.",
      constraints: "1 <= s.length, t.length <= 5 * 10^4",
      hint: "Use an array of size 26 or a frequency dictionary to count character occurrences."
    },
    {
      id: "dsa-5",
      title: "Longest Substring Without Repeating Characters",
      topic: "Strings",
      difficulty: "Medium",
      timeComplexity: "O(n)",
      spaceComplexity: "O(min(m, n))",
      description: "Given a string s, find the length of the longest substring without repeating characters.",
      exampleInput: "s = 'abcabcbb'",
      exampleOutput: "3",
      explanation: "The answer is 'abc', with the length of 3.",
      constraints: "0 <= s.length <= 5 * 10^4",
      hint: "Use the sliding window technique with two pointers and a set/map to track seen characters."
    },
    {
      id: "dsa-6",
      title: "Reverse a Linked List",
      topic: "Linked Lists",
      difficulty: "Easy",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
      exampleInput: "head = [1, 2, 3, 4, 5]",
      exampleOutput: "[5, 4, 3, 2, 1]",
      explanation: "All pointers are reversed so node 5 points to 4, 4 to 3, etc.",
      constraints: "The number of nodes is in the range [0, 5000].",
      hint: "Use three pointers: prev = null, curr = head, nextNode = null to reassign pointers iteratively."
    },
    {
      id: "dsa-7",
      title: "Detect Cycle in a Linked List",
      topic: "Linked Lists",
      difficulty: "Easy",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      description: "Given head, the head of a linked list, determine if the linked list has a cycle in it using Floyd's Cycle-Finding Algorithm.",
      exampleInput: "head = [3, 2, 0, -4], pos = 1 (tail connects to 1st node)",
      exampleOutput: "true",
      explanation: "There is a cycle in the linked list where tail connects back to the second node.",
      constraints: "0 <= number of nodes <= 10^4",
      hint: "Use two pointers moving at different speeds (slow moves 1 step, fast moves 2 steps). If they meet, a cycle exists."
    },
    {
      id: "dsa-8",
      title: "Valid Parentheses",
      topic: "Stack",
      difficulty: "Easy",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      description: "Given a string s containing just characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      exampleInput: "s = '()[]{}'",
      exampleOutput: "true",
      explanation: "All open brackets are closed by the same type of brackets in correct order.",
      constraints: "1 <= s.length <= 10^4",
      hint: "Push opening brackets onto a stack; on a closing bracket, check if top of stack matches."
    },
    {
      id: "dsa-9",
      title: "Min Stack Design",
      topic: "Stack",
      difficulty: "Medium",
      timeComplexity: "O(1) all ops",
      spaceComplexity: "O(n)",
      description: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time O(1).",
      exampleInput: "push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()",
      exampleOutput: "getMin() -> -3, top() -> 0, getMin() -> -2",
      explanation: "A secondary stack stores current running minimums alongside values.",
      constraints: "Methods pop, top and getMin operations will always be called on non-empty stacks.",
      hint: "Maintain a parallel stack or pair elements with current minimum at that snapshot."
    },
    {
      id: "dsa-10",
      title: "Implement Queue using Stacks",
      topic: "Queue",
      difficulty: "Easy",
      timeComplexity: "Amortized O(1)",
      spaceComplexity: "O(n)",
      description: "Implement a first in first out (FIFO) queue using only two standard LIFO stacks.",
      exampleInput: "push(1), push(2), peek(), pop(), empty()",
      exampleOutput: "peek() -> 1, pop() -> 1, empty() -> false",
      explanation: "Using inputStack for pushing and outputStack for popping preserves FIFO ordering.",
      constraints: "1 <= x <= 9, at most 100 calls made.",
      hint: "Transfer all elements from inStack to outStack only when outStack is empty."
    },
    {
      id: "dsa-11",
      title: "Maximum Depth of Binary Tree",
      topic: "Trees",
      difficulty: "Easy",
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
      description: "Given the root of a binary tree, return its maximum depth (number of nodes along longest root-to-leaf path).",
      exampleInput: "root = [3, 9, 20, null, null, 15, 7]",
      exampleOutput: "3",
      explanation: "The longest path is 3 -> 20 -> 15 (depth of 3).",
      constraints: "0 <= number of nodes <= 10^4",
      hint: "Recursively: maxDepth(root) = 1 + max(maxDepth(root.left), maxDepth(root.right)). Base case root == null return 0."
    },
    {
      id: "dsa-12",
      title: "Binary Tree Level Order Traversal",
      topic: "Trees",
      difficulty: "Medium",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      description: "Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
      exampleInput: "root = [3, 9, 20, null, null, 15, 7]",
      exampleOutput: "[[3], [9, 20], [15, 7]]",
      explanation: "Level 1: 3, Level 2: 9, 20, Level 3: 15, 7.",
      constraints: "0 <= number of nodes <= 2000",
      hint: "Use BFS (Breadth-First Search) with a queue. Process nodes level by level using queue.length."
    },
    {
      id: "dsa-13",
      title: "Lowest Common Ancestor in BST",
      topic: "Trees",
      difficulty: "Medium",
      timeComplexity: "O(h)",
      spaceComplexity: "O(1)",
      description: "Given a Binary Search Tree (BST), find the lowest common ancestor (LCA) node of two given nodes p and q.",
      exampleInput: "root = [6, 2, 8, 0, 4, 7, 9], p = 2, q = 8",
      exampleOutput: "6",
      explanation: "The LCA of nodes 2 and 8 is 6.",
      constraints: "All Node.val are unique. p != q.",
      hint: "Utilize BST property: If both p, q < root, go left. If both > root, go right. Otherwise, root is the split point (LCA)."
    },
    {
      id: "dsa-14",
      title: "Number of Islands",
      topic: "Graphs",
      difficulty: "Medium",
      timeComplexity: "O(m * n)",
      spaceComplexity: "O(m * n)",
      description: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
      exampleInput: "grid = [['1','1','0'],['1','1','0'],['0','0','1']]",
      exampleOutput: "2",
      explanation: "Top-left connected 1s form island 1; bottom-right 1 forms island 2.",
      constraints: "m == grid.length, n == grid[i].length, 1 <= m, n <= 300",
      hint: "Traverse the matrix; when a '1' is found, trigger DFS/BFS to sink the connected island (mark visited) and increment count."
    },
    {
      id: "dsa-15",
      title: "Course Schedule (Cycle Detection)",
      topic: "Graphs",
      difficulty: "Hard",
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V + E)",
      description: "There are numCourses you have to take. Some courses have prerequisites. Determine if you can finish all courses.",
      exampleInput: "numCourses = 2, prerequisites = [[1, 0]]",
      exampleOutput: "true",
      explanation: "To take course 1 you must have finished course 0. No cycle exists, so feasible.",
      constraints: "1 <= numCourses <= 2000, 0 <= prerequisites.length <= 5000",
      hint: "Use Kahn's Topological Sort algorithm (Indegree array) or DFS with 3-state coloring to detect directed cycles."
    },
    {
      id: "dsa-16",
      title: "Merge Intervals",
      topic: "Sorting",
      difficulty: "Medium",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.",
      exampleInput: "intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]",
      exampleOutput: "[[1, 6], [8, 10], [15, 18]]",
      explanation: "Since intervals [1, 3] and [2, 6] overlap, merge them into [1, 6].",
      constraints: "1 <= intervals.length <= 10^4",
      hint: "Sort intervals by start time. Compare current interval's start with previous interval's end."
    },
    {
      id: "dsa-17",
      title: "Binary Search",
      topic: "Searching",
      difficulty: "Easy",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums.",
      exampleInput: "nums = [-1, 0, 3, 5, 9, 12], target = 9",
      exampleOutput: "4",
      explanation: "9 exists in nums and its index is 4.",
      constraints: "1 <= nums.length <= 10^4, all integers are unique.",
      hint: "Initialize low = 0, high = n - 1. Calculate mid = low + (high - low)/2 and bisect the search space."
    },
    {
      id: "dsa-18",
      title: "Search in Rotated Sorted Array",
      topic: "Searching",
      difficulty: "Medium",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      description: "Given a sorted array rotated at some unknown pivot, search for a target value in O(log n) time.",
      exampleInput: "nums = [4, 5, 6, 7, 0, 1, 2], target = 0",
      exampleOutput: "4",
      explanation: "Target 0 is found at index 4.",
      constraints: "1 <= nums.length <= 5000",
      hint: "At least one half (left or right of mid) is always sorted. Check if target lies in the sorted half."
    },
    {
      id: "dsa-19",
      title: "Climbing Stairs",
      topic: "Dynamic Programming",
      difficulty: "Easy",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
      exampleInput: "n = 3",
      exampleOutput: "3",
      explanation: "Three ways: (1+1+1), (1+2), (2+1).",
      constraints: "1 <= n <= 45",
      hint: "This reduces to Fibonacci sequence: dp[i] = dp[i-1] + dp[i-2]."
    },
    {
      id: "dsa-20",
      title: "Coin Change",
      topic: "Dynamic Programming",
      difficulty: "Medium",
      timeComplexity: "O(amount * n)",
      spaceComplexity: "O(amount)",
      description: "Given an integer array coins representing coins of different denominations and an integer amount, return the fewest number of coins needed to make up that amount.",
      exampleInput: "coins = [1, 2, 5], amount = 11",
      exampleOutput: "3",
      explanation: "11 = 5 + 5 + 1 (3 coins).",
      constraints: "1 <= coins.length <= 12, 0 <= amount <= 10^4",
      hint: "Build a 1D DP table dp[0...amount] initialized to Infinity. dp[i] = min(dp[i], dp[i - coin] + 1)."
    }
  ],

  // ----------------------------------------
  // 3. COMPANIES DATA (10 Top Recruiters)
  // ----------------------------------------
  companies: [
    {
      id: "tcs",
      name: "TCS",
      category: "Service Based",
      badge: "Mass Recruiter / Service",
      logoText: "TCS",
      roles: ["Ninja (Software Engineer)", "Digital (Systems Engineer)", "Prime (Specialist)"],
      importantSkills: ["C / C++ / Java", "Core Computer Science", "Aptitude & Logical", "SQL / Database"],
      interviewRounds: [
        "Online Test (Numerical, Reasoning, Verbal, 2 Coding Qs)",
        "Technical Interview (OOPS, DBMS, Projects, Logic)",
        "Managerial & HR Interview (Communication, Situations)"
      ],
      checklist: [
        "Practice Speed Math & Aptitude (TCS NQT style)",
        "Master Basic DSA (Strings, Arrays, Matrix)",
        "Prepare DBMS SQL queries (Joins, Aggregations)",
        "Have 2 clean academic projects explained in depth"
      ],
      description: "Tata Consultancy Services is a global leader in IT services, consulting, and business solutions with a huge campus hiring drive (NQT)."
    },
    {
      id: "infosys",
      name: "Infosys",
      category: "Service Based",
      badge: "Service Giant",
      logoText: "INFY",
      roles: ["Systems Engineer (SE)", "Specialist Programmer (SP)", "Digital Specialist Engineer (DSE)"],
      importantSkills: ["Java / Python / C++", "Pseudocode analysis", "Data Structures", "Web Basics"],
      interviewRounds: [
        "InfyTQ / Certification Exam / Online Assessment",
        "Technical Coding Round (HackWithInfy for high packages)",
        "Combined Tech + HR Interview"
      ],
      checklist: [
        "Practice Pseudocode & Logic questions",
        "Revise OOPs concepts with code examples",
        "Solve Medium level array & string problems for DSE",
        "Know your final year project inside out"
      ],
      description: "Infosys is a renowned multinational IT company offering diverse career paths from Systems Engineer to high-tier Specialist roles."
    },
    {
      id: "wipro",
      name: "Wipro",
      category: "Service Based",
      badge: "Global Tech Services",
      logoText: "WIPRO",
      roles: ["Project Engineer (Elite)", "Turbo Developer", "Cloud / Data Associate"],
      importantSkills: ["C++ / Java / Python", "Essay Writing & Verbal", "Basic Coding", "Networking"],
      interviewRounds: [
        "Online Test (Aptitude, Verbal, Essay Writing, 2 Coding Qs)",
        "Technical Interview (Core CS, Final Year Project)",
        "HR Interview (Company background, Willingness to relocate)"
      ],
      checklist: [
        "Practice typing and essay structure for online test",
        "Revise basic data structures (Stack, Queue, LinkedList)",
        "Be ready with clean resume and clear explanations",
        "Understand basic Cloud & OS fundamentals"
      ],
      description: "Wipro Elite National Talent Hunt recruits thousands of engineers annually with a strong focus on technical aptitude and communication."
    },
    {
      id: "accenture",
      name: "Accenture",
      category: "Consulting",
      badge: "Consulting & Tech",
      logoText: "ACN",
      roles: ["Associate Software Engineer (ASE)", "Advanced ASE (FSD)", "Security Associate"],
      importantSkills: ["Critical Thinking", "Abstract Reasoning", "Pseudocode", "Coding (C++/Java)"],
      interviewRounds: [
        "Cognitive & Technical Assessment (Elimination)",
        "Coding Assessment (2 Questions in 45 mins)",
        "Communication Assessment (Pronunciation, Fluency)",
        "Virtual Interview (Tech + HR)"
      ],
      checklist: [
        "Practice MS Office, Cloud, and Network basics for MCQ round",
        "Solve LeetCode Easy-Medium for coding assessment",
        "Prepare quiet room for automated speaking test",
        "Review behavioral STAR method answers"
      ],
      description: "Accenture delivers top-tier consulting and strategy, running comprehensive hiring rounds testing cognitive, communication, and coding capabilities."
    },
    {
      id: "capgemini",
      name: "Capgemini",
      category: "Service Based",
      badge: "Global Leader",
      logoText: "CAP",
      roles: ["Software Analyst", "Senior Software Engineer", "Cloud Associate"],
      importantSkills: ["Pseudo-code", "Game-Based Aptitude", "English Verbal", "Coding"],
      interviewRounds: [
        "Technical Assessment & Pseudocode Round",
        "Game-Based Aptitude & Behavioral Test",
        "Spoken English Assessment",
        "Technical & HR Interview"
      ],
      checklist: [
        "Familiarize with grid, motion, and speed games in aptitude",
        "Practice dry running pseudocode loops and recursions",
        "Prepare fundamental algorithms (Sorting, Searching)",
        "Review resume projects and team experiences"
      ],
      description: "Capgemini emphasizes innovative gamified aptitude assessments alongside fundamental coding and software analytical skills."
    },
    {
      id: "cognizant",
      name: "Cognizant",
      category: "Service Based",
      badge: "GenC & Elevate",
      logoText: "CTS",
      roles: ["GenC", "GenC Elevate", "GenC Next (Product Specialist)"],
      importantSkills: ["Analytical Ability", "Data Structures", "SQL / RDBMS", "Web Tech"],
      interviewRounds: [
        "Aptitude + Skill Based Assessment",
        "Coding Assessment (for Elevate / Next)",
        "Technical Interview (Hands-on coding, DBMS)",
        "HR Discussion"
      ],
      checklist: [
        "Understand Git, basic Full Stack or Cloud concepts",
        "Practice String manipulations & Hash Map problems",
        "Prepare SQL joins, subqueries, and normalization",
        "Be articulate about internship & project work"
      ],
      description: "Cognizant's GenC framework offers distinct salary tiers based on candidates' aptitude and specialized coding performance."
    },
    {
      id: "amazon",
      name: "Amazon",
      category: "Product Based",
      badge: "Big Tech / FAANG",
      logoText: "AMZN",
      roles: ["Software Development Engineer I (SDE 1)", "Data Engineer I", "Quality Assurance Engineer"],
      importantSkills: ["DSA (Trees, Graphs, DP)", "16 Leadership Principles", "System Design Basics", "OOP Design"],
      interviewRounds: [
        "Online Assessment (2 Hard DSA Questions + Work Style Survey)",
        "Technical Round 1: DSA (Arrays, Strings, Trees)",
        "Technical Round 2: DSA (Graphs, Dynamic Programming)",
        "Technical Round 3: Low Level Design / OOD",
        "Bar Raiser Round: Deep Dive LP & Complex Problem Solving"
      ],
      checklist: [
        "Master 16 Amazon Leadership Principles with STAR stories",
        "Solve 150+ Medium & Hard LeetCode questions",
        "Practice writing clean, modular, and error-free code on whiteboard/doc",
        "Study Object-Oriented Design (Parking Lot, Elevator, Chess)"
      ],
      description: "Amazon is an e-commerce and cloud (AWS) giant known for its intense technical rigor and deep focus on customer obsession leadership principles."
    },
    {
      id: "microsoft",
      name: "Microsoft",
      category: "Product Based",
      badge: "Big Tech / Tier 1",
      logoText: "MSFT",
      roles: ["Software Engineer (SWE)", "Support Engineer", "Program Manager"],
      importantSkills: ["Advanced DSA", "OS & Multithreading", "System Architecture", "Problem Solving"],
      interviewRounds: [
        "Online Assessment (3 Coding Questions on Codility)",
        "Technical Round 1: Data Structures & Code Optimization",
        "Technical Round 2: Algorithms, Trees, Graph Traversals",
        "Technical Round 3: OS concepts, Memory management, Concurrency",
        "Technical/Managerial Round: Cultural Fit & Architectural Vision"
      ],
      checklist: [
        "Thorough understanding of OS internals (Processes, Threads, Virtual Memory)",
        "Deep DSA proficiency (Binary Trees, Graphs, Heaps, DP)",
        "Write edge-case proof code during live interviews",
        "Demonstrate growth mindset and collaboration"
      ],
      description: "Microsoft seeks engineers with deep foundational knowledge of operating systems, algorithmic excellence, and passionate problem solvers."
    },
    {
      id: "google",
      name: "Google",
      category: "Product Based",
      badge: "Elite Tech / Tier 1",
      logoText: "GOOG",
      roles: ["Software Engineer (SWE)", "Associate Product Manager", "Site Reliability Engineer"],
      importantSkills: ["Algorithmic Design", "Graph Theory", "Complex DP", "Time/Space Optimization"],
      interviewRounds: [
        "Google Online Challenge (GOC / OA with 2 Complex Problems)",
        "Phone Screen Round (45 mins Coding on Google Docs)",
        "Onsite / Virtual: 3-4 Rounds of Pure Algorithmic Coding",
        "Googleyness & Leadership Behavioral Round"
      ],
      checklist: [
        "Master time & space complexity tradeoffs",
        "Practice thinking out loud and clarifying ambiguous requirements",
        "Solve LeetCode Hard and Codeforces 1500+ problems",
        "Review Graph algorithms (Dijkstra, Topological, Flow) & Advanced DP"
      ],
      description: "Google maintains the gold standard for software engineering interviews, focusing heavily on algorithmic scalability and innovative thinking."
    },
    {
      id: "deloitte",
      name: "Deloitte",
      category: "Consulting",
      badge: "Big 4 Advisory",
      logoText: "DELO",
      roles: ["Analyst", "Consultant", "Risk & Financial Advisory Associate"],
      importantSkills: ["Business Logic", "Data Analysis & Excel/SQL", "Aptitude & English", "Case Studies"],
      interviewRounds: [
        "Online Aptitude Test (Quantitative, Logical, Verbal)",
        "Group Discussion / Case Presentation Round",
        "Technical Interview (Problem Solving, Database, Python/Java)",
        "Partner / Leadership Interview"
      ],
      checklist: [
        "Practice business case study analysis and presentation",
        "Revise SQL queries and data manipulation fundamentals",
        "Prepare strong communication for group discussion rounds",
        "Research Deloitte's service lines and recent tech solutions"
      ],
      description: "Deloitte is a Big Four professional services network hiring technical and advisory analysts with strong analytical and communication skills."
    }
  ],

  // ----------------------------------------
  // 4. LEARNING RESOURCES & ROADMAPS (14 Curated Topics)
  // ----------------------------------------
  resources: [
    // Programming Languages
    {
      id: "res-c",
      topic: "C Programming",
      category: "Programming",
      difficulty: "Beginner",
      duration: "10 Hours",
      description: "Pointers, memory allocation, structures, file handling, and core C syntax for interview coding rounds.",
      keyConcepts: ["Pointers & Memory Addresses", "Dynamic Memory Allocation (malloc, calloc, free)", "Structures & Unions", "Bitwise Operators", "Preprocessor Directives"],
      interviewQuestions: [
        "What is the difference between malloc() and calloc()?",
        "Explain dangling pointers and how to avoid memory leaks.",
        "What is the difference between structure and union in C?",
        "How do #define and const differ in C?"
      ]
    },
    {
      id: "res-cpp",
      topic: "C++ & STL",
      category: "Programming",
      difficulty: "Intermediate",
      duration: "15 Hours",
      description: "Object Oriented Programming, Standard Template Library (Vectors, Maps, Sets), and fast I/O for DSA.",
      keyConcepts: ["STL Containers (vector, unordered_map, set, priority_queue)", "Pointers vs References", "Constructors & Destructors", "Virtual Functions & Polymorphism", "Operator Overloading"],
      interviewQuestions: [
        "How does std::unordered_map differ from std::map internally?",
        "Explain virtual destructors and why they are necessary.",
        "What is the Diamond Problem and how does virtual inheritance solve it?",
        "What is the difference between deep copy and shallow copy?"
      ]
    },
    {
      id: "res-java",
      topic: "Core Java",
      category: "Programming",
      difficulty: "Intermediate",
      duration: "18 Hours",
      description: "Java fundamentals, OOP principles, Collection Framework, Exception Handling, and JVM memory architecture.",
      keyConcepts: ["JVM, JRE, and JDK Architecture", "Java Collections Framework (ArrayList, HashMap, etc.)", "Multithreading & Synchronization", "Interfaces vs Abstract Classes", "Garbage Collection & Memory Management"],
      interviewQuestions: [
        "How does HashMap work internally in Java 8?",
        "What is the difference between String, StringBuilder, and StringBuffer?",
        "Explain checked vs unchecked exceptions.",
        "What is the purpose of the 'transient' and 'volatile' keywords?"
      ]
    },
    {
      id: "res-python",
      topic: "Python for Placements",
      category: "Programming",
      difficulty: "Beginner to Intermediate",
      duration: "12 Hours",
      description: "Python data structures (lists, dicts, tuples), list comprehensions, decorators, generators, and interview tricks.",
      keyConcepts: ["Lists, Tuples, Dictionaries & Sets", "List & Dict Comprehensions", "Decorators & Generators (yield)", "Lambda, Map, Filter", "Time Complexity of Built-in Functions"],
      interviewQuestions: [
        "What is the difference between mutable and immutable types in Python?",
        "How does Python manage memory (Reference counting & Garbage Collection)?",
        "What is the Global Interpreter Lock (GIL)?",
        "Explain the difference between 'is' and '=='."
      ]
    },

    // Core Computer Science
    {
      id: "res-dbms",
      topic: "DBMS & SQL",
      category: "Core CS",
      difficulty: "Intermediate",
      duration: "14 Hours",
      description: "ACID properties, Normalization (1NF-BCNF), Indexing (B+ Trees), Transactions, and essential SQL queries.",
      keyConcepts: ["ACID Properties & Transactions", "Database Normalization (1NF, 2NF, 3NF, BCNF)", "Indexing & B/B+ Trees", "SQL Joins & Subqueries", "NoSQL vs Relational Databases"],
      interviewQuestions: [
        "Explain ACID properties with real-world banking examples.",
        "What is the difference between clustered and non-clustered index?",
        "Write SQL query to find the 2nd highest salary from an Employee table.",
        "What is the difference between DELETE, TRUNCATE, and DROP?"
      ]
    },
    {
      id: "res-os",
      topic: "Operating Systems",
      category: "Core CS",
      difficulty: "Intermediate",
      duration: "14 Hours",
      description: "Processes, threads, CPU scheduling algorithms, deadlock prevention, virtual memory, and paging.",
      keyConcepts: ["Process vs Thread & Context Switching", "CPU Scheduling (FCFS, SJF, Round Robin)", "Deadlock Conditions & Banker's Algorithm", "Paging, Segmentation & Page Faults", "Semaphores & Mutex Locks"],
      interviewQuestions: [
        "What are the four necessary conditions for Deadlock?",
        "What is the difference between Mutex and Semaphore?",
        "Explain Thrashing in virtual memory and how to resolve it.",
        "What is the difference between user mode and kernel mode?"
      ]
    },
    {
      id: "res-cn",
      topic: "Computer Networks",
      category: "Core CS",
      difficulty: "Intermediate",
      duration: "12 Hours",
      description: "OSI and TCP/IP models, TCP 3-way handshake, DNS resolution, HTTP/HTTPS, IP addressing, and routing.",
      keyConcepts: ["OSI 7 Layers vs TCP/IP Layers", "TCP 3-Way Handshake & Connection Termination", "HTTP vs HTTPS & SSL/TLS Handshake", "DNS Resolution Process", "Subnetting & IP Addressing (IPv4 vs IPv6)"],
      interviewQuestions: [
        "What happens behind the scenes when you type 'google.com' in a browser?",
        "What is the difference between TCP and UDP?",
        "Explain the purpose of ARP and how it maps IP to MAC.",
        "What is the difference between symmetric and asymmetric encryption in HTTPS?"
      ]
    },
    {
      id: "res-oops",
      topic: "Object-Oriented Programming (OOP)",
      category: "Core CS",
      difficulty: "Beginner to Intermediate",
      duration: "10 Hours",
      description: "The 4 pillars (Encapsulation, Abstraction, Inheritance, Polymorphism), SOLID principles, and design patterns.",
      keyConcepts: ["4 Pillars of OOP", "Compile-time vs Runtime Polymorphism", "SOLID Principles", "Singleton & Factory Design Patterns", "Composition vs Inheritance"],
      interviewQuestions: [
        "Explain the 4 pillars of OOP with real-world code analogies.",
        "What are SOLID principles? Explain the Single Responsibility Principle.",
        "How do you implement a thread-safe Singleton pattern?",
        "Why is composition preferred over inheritance in modern design?"
      ]
    },
    {
      id: "res-se",
      topic: "Software Engineering & Agile",
      category: "Core CS",
      difficulty: "Beginner",
      duration: "8 Hours",
      description: "SDLC phases, Agile/Scrum ceremonies, Git version control, unit testing, and CI/CD basics.",
      keyConcepts: ["SDLC Models (Waterfall, Spiral, Agile)", "Scrum Ceremonies (Sprints, Standups, Retrospectives)", "Git Workflow (Branching, Merge, Rebase, PRs)", "Testing Types (Unit, Integration, E2E)", "CI/CD Pipeline Basics"],
      interviewQuestions: [
        "What is the difference between Git merge and Git rebase?",
        "How does the Agile Scrum framework operate in a tech company?",
        "What is Test-Driven Development (TDD)?",
        "What is the difference between regression testing and smoke testing?"
      ]
    },

    // Placement & Interview Skills
    {
      id: "res-apt-guide",
      topic: "Aptitude Mastery Guide",
      category: "Placement",
      difficulty: "Beginner",
      duration: "20 Hours",
      description: "Speed math shortcuts, percentage formulas, time & work techniques, and syllogism tricks.",
      keyConcepts: ["Speed Math & Vedic Math Shortcuts", "Percentages, Profit & Loss Formulas", "Time, Speed & Distance / Train Problems", "Permutation & Combination Rules", "Data Interpretation Charts"],
      interviewQuestions: [
        "How to quickly calculate compound interest without complex formula?",
        "Mastering the Alligation and Mixture shortcut method.",
        "Solving complex Syllogisms with Venn diagrams in under 45 seconds.",
        "Effective time allocation strategies for online placement tests."
      ]
    },
    {
      id: "res-logical",
      topic: "Logical Reasoning Strategies",
      category: "Placement",
      difficulty: "Beginner",
      duration: "15 Hours",
      description: "Seating arrangements, blood relations, coding-decoding, direction sense, and clock/calendar problems.",
      keyConcepts: ["Linear and Circular Seating Arrangements", "Blood Relations Tree Mapping", "Coding & Decoding Patterns", "Direction Sense Vectors", "Clocks & Calendars Angle Formulas"],
      interviewQuestions: [
        "Step-by-step approach to crack 8-person circular seating arrangement.",
        "Calculating angle between clock hands at 3:15 without errors.",
        "Deciphering matrix and alphanumeric puzzle grids.",
        "Finding day of the week for any historical date."
      ]
    },
    {
      id: "res-verbal",
      topic: "Verbal Ability & Grammar",
      category: "Placement",
      difficulty: "Beginner",
      duration: "10 Hours",
      description: "Subject-verb agreement, sentence correction, reading comprehension speed reading, and critical vocabulary.",
      keyConcepts: ["Subject-Verb Agreement Rules", "Tenses & Preposition Traps", "Reading Comprehension Speed Techniques", "Top 300 Placement Vocabulary Words", "Sentence Parajumbles Strategy"],
      interviewQuestions: [
        "Key grammar rules frequently tested in service company verbal exams.",
        "How to eliminate wrong options in sentence correction questions.",
        "Speed reading techniques for long reading comprehension passages.",
        "Structuring coherent paragraphs from jumbled sentences."
      ]
    },
    {
      id: "res-hr",
      topic: "HR Interview & Behavioral Prep",
      category: "Placement",
      difficulty: "Essential",
      duration: "6 Hours",
      description: "Master the STAR method, answer 'Tell me about yourself', salary negotiation, and situation questions.",
      keyConcepts: ["STAR Method (Situation, Task, Action, Result)", "'Tell Me About Yourself' 90-Second Formula", "Strengths, Weaknesses & Conflict Resolution", "Questions to Ask the Interviewer", "Body Language & Professional Etiquette"],
      interviewQuestions: [
        "How to structure 'Tell me about yourself' for maximum impact?",
        "What is your greatest weakness and how are you working on it?",
        "Tell me about a time you handled conflict in a team project.",
        "Why do you want to join our company specifically?"
      ]
    },
    {
      id: "res-tech-interview",
      topic: "Technical Interview Excellence",
      category: "Placement",
      difficulty: "Advanced",
      duration: "15 Hours",
      description: "Live coding communication, thinking out loud, resume deep-dives, whiteboard strategies, and edge cases.",
      keyConcepts: ["Thinking Out Loud Framework", "Clarifying Questions Before Writing Code", "Dry Running Code with Edge Cases", "Resume Projects Deep Dive Defense", "Handling Questions When You Don't Know the Answer"],
      interviewQuestions: [
        "How to structure your response when an interviewer gives an ambiguous problem?",
        "Explaining trade-offs between Space and Time Complexity clearly.",
        "How to defend architectural choices made in your academic projects.",
        "What to do when your code fails a hidden test case during live round."
      ]
    }
  ]
};

// Expose globally for browser
window.PREP_DATA = PREP_DATA;
