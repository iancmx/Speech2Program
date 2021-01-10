# Speech2Program 🎤
## Inspiration
We wanted to create something that will impact the community in a meaningful way, and decided to make something that will introduce more people to the world of programming, by breaking the accessibility barrier. Everyone programs by physically typing on a keyboard without a second thought, but what about those that are unable or find it hard to interact with a keyboard? That's why we've decided to build Speech2Program for all the people out there that don't yet know they love programming!

## What it does
Speech2Program is a VS Code extension that takes in voice input from the user's microphone, parses the message and performs actions within the editor, ultimately helping the user program via voice. The user is able to write classes, functions, move the cursor, select text and many more - all by voice! Here are a few of the things the user could say:

**"New function test"**
The editor would then type out:
```
def test:
```

**"For x in range 0 to 100"**
```
for x in range(0,100):
```
**"Jump to line 160"*
**"undo"*
**"new line"**

## How I built it

This VS Code Extension was mainly built via Microsoft's VS Code extension's API and Google Cloud's speech-to-text API. Input from the user's microphone 

## Challenges I ran into

## Accomplishments that I'm proud of
We are extremely proud that we are able to develop the VS Code extension all under a day being that we were all new to the VS Code extension API. We learned a lot during this process of reading VS Code's and Google Cloud's documentation. 

Ultimately, we are proud that we are able to use our extension to code a relatively simple program all via voice. 

## What I learned
We attended the hackathon with the objective of learning and developing software that would make an impact on the community. After coming up with the idea of Speech2Program, we realized that we were new to all the technologies that we had to use in creating the VS Code extension. A whole lot of time was spent reading and learning VS Code extension API, understanding how to interact with the editor, and trigger shortcuts. In addition, we learned how to use the Google Cloud's speech to text api to take input from our microphones and convert them into readable text. We also had to learn one of the Google technologies - GRPC, which is a REST api alternative made by Google that is faster at receiving and sending data.

## What's next for Speech2Program
Customization and optimisation of Google's Cloud Speech-To-Text service will allow us to create a "programmer" profile that is specifically designed to understand and interpret coding lingo, which will greatly enhance the usability and efficiency of Speech2Program. Specifically, we wish to use more NLP to effectively break down user sentences into coding chunks with greater accuracy to increase flexibility and move away from the naive and limited approach. 

Expanding Speech2Program to include more programming languages is also a task that we have planned, to allow users more freedom in their project language.


## Possible user inputs
1. *new class __engine__*
```
def class engine:

```
2. *new function __delete__*
```
def delete:

```
3. *x in range 0 to 10*
```
for x in range(0,100):

```
4. *box equals 3*
```
box = 3
```
5. *function print*
```
print()
```
6. *string hello world*
```
"hello world"
```
7. *jump to line 20* - puts cursor on line 20
8. *delete line* - deletes the current line
9. *indent* - indents the current line
10. *unindent* - unindent the current line
11. *copy* - copies the current selection
12. *paste* - paste on cursor position
13. *next line* - moves cursor to the line below
14. *previous line* - moves cursor to the line above
15. *new file* - creates a new file
16. *select* - selects the current line
17. *delete* - deletes the word behind the cursor
