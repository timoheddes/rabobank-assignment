# Rabobank Customer Statement Processor

> _"Rabobank receives monthly deliveries of customer statement records. This
> information is delivered in two formats, CSV and XML. These records need to be
> validated."_

---

```sh
# install dependencies
npm i

# to test
npm run test
```

## The challenge

The challenge is to implement an I/O API that can process the customer statement
records and generate a report on any invalid records.

The customer statement records can be delivered in two file formats: `CSV` or
`XML`. Records within these files need to be parsed and validated.

#### Validations:

1. all records should have a unique transaction reference.
2. all records should show a balance that matches the sum of all the mutations
   to the initial balance.

**Any record that does not meet these requirements should be written to a
report.**

## Approach

My approach consists of three steps:

1. Read the input file and parse the records.
2. Validate the records.
3. Generate a report.

### Requirements and missing requirements

As this is a challenge, there are some requirements missing. Additional to the
requirements I received initially, I was also told:

> _"A requirement we would put to you is that the report should be easy to use
> for further processing. Think about what is necessary for a user/another
> application to best navigate this report, what information should be in it and
> how can it best be presented and used."_

### Statements and assumptions

1. My goal with this is to create a simple API that could easily be implemented
   in other applications.
2. I will not implement a UI as the challenge is to create a processor that
   generates a report that can be used elsewhere. <sup>1</sup>
3. I will use a command line interface to demonstrate the functionality and
   write the reports.
4. Based on the additional requirement, I will use a `JSON` format for the
   report as a default.

<sup>**1:** _I imagine a statement processor would more likely exist in an
automated environment as part of a pipeline rather than implemented in a UI.
However, a manual file upload could potentially be a future use-case for a
UI._</sup>

### Focus points

1. **Code quality**
2. **Testing and high coverage**
3. **Type safety (TS) and documentation (JSDoc)**
