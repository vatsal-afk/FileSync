class CommitNode {
    constructor(message, prev = null) {
        this.message = message;
        this.hash = this.computeHash();
        this.next = null; // Pointer to the next commit node
        this.prev = prev; // Pointer to the previous commit node
    }

    computeHash() {
        const crypto = require('crypto');
        return crypto.createHash('sha1').update(this.message).digest('hex');
    }
}

class CommitHistory {
    constructor() {
        this.head = null; // Start with an empty linked list
        this.tail = null; // Track the last commit (tail) for easier appending
    }

    addCommit(message) {
        const newCommit = new CommitNode(message, this.tail);
        if (this.head === null) {
            this.head = newCommit;
        } else {
            this.tail.next = newCommit; // Update the next pointer of the last commit
        }
        this.tail = newCommit; // Update the tail to the new commit
    }

    printHistory() {
        let current = this.head;
        while (current !== null) {
            const prevHash = current.prev ? current.prev.hash : "None";
            console.log(`[Message: ${current.message}, Hash: ${current.hash}, Previous Hash: ${prevHash}]`);
            current = current.next;
        }
    }
}

// Example usage
const history = new CommitHistory();
history.addCommit("Initial commit");
history.addCommit("Added README");
history.addCommit("Implemented feature X");

history.printHistory();
