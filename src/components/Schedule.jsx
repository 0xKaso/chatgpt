import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background.jpg'

const schedule = [
  {
    date: '2023Q1',
    dateTime: '2023-03-01',
    summary:
      'The first day of the conference is focused on dark patterns for ecommerce.',
    timeSlots: [
      {
        name: 'the GPT Bots',
        description: 'Launched a rarer V2 version NFT "the GPT Bot", holders of V1 can enjoy priority purchase and discounts',
        // start: '9:00AM',
        // end: '10:00AM',
      },
      {
        name: 'Play to earn',
        description:
          'Develop a casual game based on chatGPT, and earn tokens through entertainment',
        // start: '9:00AM',
        // end: '10:00AM',
      },
      {
        name: 'More',
        description:
          'Will not be announced yet, so stay tuned',
        // start: '9:00AM',
        // end: '10:00AM',
      },
    ],
  },
  {
    date: '2023Q2',
    dateTime: '2022-06-01',
    summary:
      'Next we spend the day talking about deceiving people with technology.',
    timeSlots: [
      {
        name: 'the GPT Bots',
        description: 'Launched a rarer V2 version NFT "the GPT Bot", holders of V1 can enjoy priority purchase and discounts',
        // start: '9:00AM',
        // end: '10:00AM',
      },
      {
        name: 'Play to earn',
        description:
          'Develop a casual game based on chatGPT, and earn tokens through entertainment',
        // start: '9:00AM',
        // end: '10:00AM',
      },
      {
        name: 'More',
        description:
          'Will not be announced yet, so stay tuned',
        // start: '9:00AM',
        // end: '10:00AM',
      },
    ],
  },
  {
    date: '2023Q2',
    dateTime: '2022-06-01',
    summary:
      'We close out the event previewing new techniques that are still in development.',
    timeSlots: [
      {
        name: 'Burning Gameplay',
        description: 'Will not be announced yet, so stay tuned',
        // start: '9:00AM',
        // end: '10:00AM',
      },
      {
        name: 'Staking & Deployment',
        description:
          'Will not be announced yet, so stay tuned',
        // start: '9:00AM',
        // end: '10:00AM',
      },
      {
        name: 'More',
        description:
          'Will not be announced yet, so stay tuned',
        // start: '9:00AM',
        // end: '10:00AM',
      },
    ],
  },
 
]

function ScheduleTabbed() {
  let [tabOrientation, setTabOrientation] = useState('horizontal')

  useEffect(() => {
    let smMediaQuery = window.matchMedia('(min-width: 640px)')

    function onMediaQueryChange({ matches }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal')
    }

    onMediaQueryChange(smMediaQuery)
    smMediaQuery.addEventListener('change', onMediaQueryChange)

    return () => {
      smMediaQuery.removeEventListener('change', onMediaQueryChange)
    }
  }, [])

  return (
    <Tab.Group
      as="div"
      className="mx-auto grid max-w-2xl grid-cols-1 gap-y-6 sm:grid-cols-2 lg:hidden"
      vertical={tabOrientation === 'vertical'}
    >
      <Tab.List className="-mx-4 flex gap-x-4 gap-y-10 overflow-x-auto pl-4 pb-4 sm:mx-0 sm:flex-col sm:pb-0 sm:pl-0 sm:pr-8">
        {({ selectedIndex }) =>
          schedule.map((day, dayIndex) => (
            <div
              key={day.dateTime}
              className={clsx(
                'relative w-3/4 flex-none pr-4 sm:w-auto sm:pr-0',
                dayIndex !== selectedIndex && 'opacity-70'
              )}
            >
              <DaySummary
                day={{
                  ...day,
                  date: (
                    <Tab className="[&:not(:focus-visible)]:focus:outline-none">
                      <span className="absolute inset-0" />
                      {day.date}
                    </Tab>
                  ),
                }}
              />
            </div>
          ))
        }
      </Tab.List>
      <Tab.Panels>
        {schedule.map((day) => (
          <Tab.Panel
            key={day.dateTime}
            className="[&:not(:focus-visible)]:focus:outline-none"
          >
            <TimeSlots day={day} />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

function DaySummary({ day }) {
  return (
    <>
      <h3 className="text-2xl font-semibold tracking-tight">
        <time dateTime={day.dateTime}>{day.date}</time>
      </h3>
      <p className="mt-1.5 text-base tracking-tight">{day.summary}</p>
    </>
  )
}

function TimeSlots({ day, className }) {
  return (
    <ol
      role="list"
      className={clsx(
        className,
        'space-y-8 bg-white/60 py-14 px-10 text-center shadow-xl shadow-blue-900/5 backdrop-blur'
      )}
    >
      {day.timeSlots.map((timeSlot, timeSlotIndex) => (
        <li
          key={timeSlot.start}
          aria-label={`${timeSlot.name} talking about ${timeSlot.description} at ${timeSlot.start} - ${timeSlot.end} PST`}
        >
          {timeSlotIndex > 0 && (
            <div className="mx-auto mb-8 h-px w-48 bg-indigo-500/10" />
          )}
          <h4 className="text-lg font-semibold tracking-tight">
            {timeSlot.name}
          </h4>
          {timeSlot.description && (
            <p className="mt-1 tracking-tight">{timeSlot.description}</p>
          )}
          <p className="mt-1 font-mono text-sm text-slate-500">
            <time dateTime={`${day.dateTime}T${timeSlot.start}-08:00`}>
              {timeSlot.start}
            </time>
          </p>
        </li>
      ))}
    </ol>
  )
}

function ScheduleStatic() {
  return (
    <div className="hidden lg:grid lg:grid-cols-3 lg:gap-x-8">
      {schedule.map((day) => (
        <section key={day.dateTime}>
          <DaySummary day={day} />
          <TimeSlots day={day} className="mt-10" />
        </section>
      ))}
    </div>
  )
}

export function Schedule() {
  return (
    <section id="schedule" aria-label="Schedule" className="py-20 sm:py-32">
      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-4xl lg:pr-24">
          <h2 className="font-display text-4xl font-medium tracking-tighter sm:text-5xl">
            More about the GPT Users
          </h2>
          <p className="mt-4 font-display text-2xl tracking-tight">
            Holders of "the GPT Users" can enjoy continuously available chatGPT
            conversations, UGPT token incentives, subsequent version NFT
            discounts and priority purchase qualifications, and future pledge
            rewards
          </p>
        </div>
      </Container>
      <div className="relative mt-14 sm:mt-24">
        <div className="absolute inset-x-0 -top-40 -bottom-32 overflow-hidden">
          <Image
            className="absolute left-full top-0 -translate-x-1/2 sm:left-1/2 sm:translate-y-[-15%] sm:translate-x-[-20%] md:translate-x-0 lg:translate-x-[5%] lg:translate-y-[4%] xl:translate-y-[-8%] xl:translate-x-[27%]"
            // src={backgroundImage}
            alt=""
            width={918}
            height={1495}
            unoptimized
          />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white" />
        </div>
        <Container className="relative">
          <ScheduleTabbed />
          <ScheduleStatic />
        </Container>
      </div>
    </section>
  )
}
