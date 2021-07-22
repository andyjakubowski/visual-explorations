# PEDAC

Create a list backed by a potentially unbound data structure.

Rather than creating a list item for every possible data item, create a predefined number of list items representing a window into the data structure.

Make it possible to offset the window so that every data item can be represented in the list.

For example, imagine you have an ordered collection of 1,000 images, and a list that shows 10 images at a time. You start with an offset of 0, so you show images at indexes 0 through 9 (inclusive). Your list can be interacted with to change its offset, for example to show (0 + 1..9 + 1) -> (1..10).

## Understand the Problem

- Our list window will have its own set of indexes depending on the size of the list.
- Our data collection will also have its set of indexes.
- there might actually be three separate things here:

1. The data collection (potentially unbound)
2. The list items collection (a subset of the data collection)
3. The visible list items collection (a subset of the list items)

- the reason to have more list items than can be visible at the same time is to have a little more time to retrieve items from the data collection and render them into the list items that aren’t yet visible; this is all to create the experience of scrolling through an unbound list as though all the list items were just there, not just a subset

## Examples

## Data Structures

## Algorithm

## Code with Intent
